using System.Text;
using System.Text.Json;
using API.Data;
using API.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class GeminiChatService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly ILogger<GeminiChatService> _logger;
        private readonly StoreContext _context;
        private readonly PineconeService _pineconeService;
        private const string MODEL = "gemini-1.5-flash"; // Using Gemini 1.5 Flash for chat

        public GeminiChatService(
            IConfiguration configuration,
            ILogger<GeminiChatService> logger,
            StoreContext context,
            PineconeService pineconeService)
        {
            _apiKey = Environment.GetEnvironmentVariable("GEMINI_API_KEY")
                ?? throw new InvalidOperationException("Gemini API key not configured");
            _logger = logger;
            _context = context;
            _pineconeService = pineconeService;

            _httpClient = new HttpClient
            {
                BaseAddress = new Uri("https://generativelanguage.googleapis.com/")
            };
        }

        public async Task<string> ChatAsync(string userMessage, string? userEmail = null, List<object>? conversationHistory = null)
        {
            _logger.LogInformation("Processing chat message: {Message}", userMessage);

            try
            {
                // Build context based on the user's message
                var contextInfo = await BuildContextAsync(userMessage, userEmail);

                // Build the system instruction
                var systemInstruction = BuildSystemInstruction(contextInfo);

                // Build conversation history
                var contents = new List<object>();

                // Add previous conversation history if exists
                if (conversationHistory != null && conversationHistory.Any())
                {
                    contents.AddRange(conversationHistory);
                }

                // Add current user message
                contents.Add(new
                {
                    role = "user",
                    parts = new[]
                    {
                new { text = userMessage }
            }
                });

                var requestBody = new
                {
                    systemInstruction = new  // Changed from system_instruction
                    {
                        parts = new[]
                        {
                    new { text = systemInstruction }
                }
                    },
                    contents = contents,
                    generationConfig = new
                    {
                        temperature = 0.7,
                        topK = 40,
                        topP = 0.95,
                        maxOutputTokens = 1024,
                    }
                };

                var jsonContent = JsonSerializer.Serialize(requestBody, new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase  // This will convert to camelCase
                });
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                var url = $"v1/models/{MODEL}:generateContent?key={_apiKey}";
                var response = await _httpClient.PostAsync(url, content);

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    _logger.LogError("Gemini API error: {StatusCode} - {Error}", response.StatusCode, error);
                    return "I apologize, but I'm having trouble connecting to my AI service right now. Please try again in a moment.";
                }

                var responseJson = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(responseJson);

                var text = doc.RootElement
                    .GetProperty("candidates")[0]
                    .GetProperty("content")
                    .GetProperty("parts")[0]
                    .GetProperty("text")
                    .GetString();

                return text ?? "I'm not sure how to respond to that. Could you please rephrase your question?";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in chat service");
                return "I apologize, but I encountered an error. Please try again.";
            }
        }

        private async Task<Dictionary<string, object>> BuildContextAsync(string userMessage, string? userEmail)
        {
            var context = new Dictionary<string, object>();
            var messageLower = userMessage.ToLower();

            // Check if user is asking about products
            if (messageLower.Contains("product") || messageLower.Contains("buy") ||
                messageLower.Contains("looking for") || messageLower.Contains("recommend") ||
                messageLower.Contains("show me") || messageLower.Contains("find"))
            {
                try
                {
                    // Use semantic search to find relevant products
                    var searchResults = await _pineconeService.SearchProductsAsync(userMessage, 5);
                    if (searchResults.Any())
                    {
                        context["relevant_products"] = searchResults.Select(r => new
                        {
                            id = r.Product.Id,
                            name = r.Product.Name,
                            description = r.Product.Description,
                            price = r.Product.Price,
                            brand = r.Product.Brand,
                            type = r.Product.Type,
                            stock = r.Product.QuantityInStock,
                            score = r.Score
                        }).ToList();
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Could not fetch product context");
                }
            }

            // Check if user is asking about orders
            if (!string.IsNullOrEmpty(userEmail) &&
                (messageLower.Contains("order") || messageLower.Contains("track") ||
                 messageLower.Contains("delivery") || messageLower.Contains("shipment")))
            {
                try
                {
                    var orders = await _context.Orders
                        .Include(o => o.OrderItems)
                        .Where(o => o.BuyerEmail == userEmail)
                        .OrderByDescending(o => o.OrderDate)
                        .Take(5)
                        .Select(o => new
                        {
                            orderId = o.Id,
                            orderDate = o.OrderDate,
                            status = o.OrderStatus.ToString(),
                            total = o.GetTotal(),
                            itemCount = o.OrderItems.Count,
                            deliveryFee = o.DeliveryFee,
                            items = o.OrderItems.Select(i => new
                            {
                                name = i.ItemOrdered.Name,
                                quantity = i.Quantity,
                                price = i.Price
                            }).ToList()
                        })
                        .ToListAsync();

                    if (orders.Any())
                    {
                        context["user_orders"] = orders;
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Could not fetch order context");
                }
            }

            // Add store information
            context["store_name"] = "ReStore";
            context["delivery_policy"] = "Free delivery on orders over $100. Standard delivery fee is $5.";
            context["return_policy"] = "30-day return policy on all items. Items must be unused and in original packaging.";

            return context;
        }

        private string BuildSystemInstruction(Dictionary<string, object> context)
        {
            var instruction = new StringBuilder();

            instruction.AppendLine("You are a helpful and friendly AI shopping assistant for ReStore, an online electronics and outdoor equipment store.");
            instruction.AppendLine("Your role is to help customers discover products, answer questions, and track their orders.");
            instruction.AppendLine("\nGuidelines:");
            instruction.AppendLine("- Be concise, friendly, and helpful");
            instruction.AppendLine("- When recommending products, mention the name, price, and key features");
            instruction.AppendLine("- Format prices in dollars (e.g., $99.99)");
            instruction.AppendLine("- If you don't have specific information, be honest and suggest alternatives");
            instruction.AppendLine("- Always prioritize customer satisfaction");
            instruction.AppendLine("- When discussing orders, provide tracking numbers and status updates");
            instruction.AppendLine("- Encourage customers to check out related products");

            instruction.AppendLine("\nStore Policies:");
            instruction.AppendLine($"- {context.GetValueOrDefault("delivery_policy", "")}");
            instruction.AppendLine($"- {context.GetValueOrDefault("return_policy", "")}");

            if (context.ContainsKey("relevant_products"))
            {
                instruction.AppendLine("\nRelevant Products for this query:");
                var products = JsonSerializer.Serialize(context["relevant_products"], new JsonSerializerOptions
                {
                    WriteIndented = true
                });
                instruction.AppendLine(products);
                instruction.AppendLine("\nUse these products to provide personalized recommendations. Include product IDs so customers can find them easily.");
            }

            if (context.ContainsKey("user_orders"))
            {
                instruction.AppendLine("\nCustomer's Recent Orders:");
                var orders = JsonSerializer.Serialize(context["user_orders"], new JsonSerializerOptions
                {
                    WriteIndented = true
                });
                instruction.AppendLine(orders);
                instruction.AppendLine("\nUse this information to answer questions about the customer's orders.");
            }

            // Add FAQs
            instruction.AppendLine("\nCommon FAQs:");
            instruction.AppendLine("- Shipping: We offer standard and express shipping. Standard takes 3-5 business days, express takes 1-2 days.");
            instruction.AppendLine("- Payment: We accept all major credit cards, PayPal, and Apple Pay.");
            instruction.AppendLine("- Returns: Easy 30-day returns. Contact support to initiate a return.");
            instruction.AppendLine("- Warranty: All electronics come with a 1-year manufacturer warranty.");
            instruction.AppendLine("- Customer Support: Available Mon-Fri 9AM-6PM EST via email or chat.");

            return instruction.ToString();
        }
    }
}
