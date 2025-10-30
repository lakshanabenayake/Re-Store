
using System.Text;
using System.Text.Json;
using API.Interfaces;

namespace API.Services
{
    public class GeminiEmbeddingService : IEmbeddingService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly ILogger<GeminiEmbeddingService> _logger;
        private const string MODEL = "models/text-embedding-004"; // Latest Gemini embedding model

        public GeminiEmbeddingService(
            IConfiguration configuration,
            ILogger<GeminiEmbeddingService> logger)
        {
            _apiKey = Environment.GetEnvironmentVariable("GEMINI_API_KEY")
                ?? throw new InvalidOperationException("Gemini API key not configured");
            _logger = logger;

            _httpClient = new HttpClient
            {
                BaseAddress = new Uri("https://generativelanguage.googleapis.com/")
            };
        }

        public async Task<float[]> GenerateEmbeddingsAsync(string text)
        {
            _logger.LogInformation("Generating embedding with Gemini for text: {Text}",
              text.Length > 50 ? text.Substring(0, 50) + "..." : text);
                
            var requestBody = new
            {
                model = MODEL,
                instances = new[]
                {
                    new { content = text }
                }
            };

            var jsonContent = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            // Call Gemini API
            var url = $"v1beta/{MODEL}:embedContent?key={_apiKey}";
            var response = await _httpClient.PostAsync(url, content);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new Exception($"Gemini API error: {response.StatusCode} - {error}");
            }

            // Parse response
            var responseJson = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(responseJson);

            var embedding = doc.RootElement
                .GetProperty("embedding")
                .GetProperty("values")
                .EnumerateArray()
                .Select(x => (float)x.GetDouble())
                .ToArray();

            _logger.LogInformation("Successfully generated embedding with {Dimensions} dimensions",
                embedding.Length);

            return embedding;
        }
    
    }
        
}