using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using DotNetEnv;

namespace API.Services
{
    public class PineconeService
    {
        private readonly HttpClient _httpClient;
        private readonly IEmbeddingService _embeddingService;
        private readonly ILogger<PineconeService> _logger;
        private readonly string _indexHost;

        public PineconeService(
            IConfiguration configuration,
            IEmbeddingService embeddingService,
            ILogger<PineconeService> logger)
        {
            var apiKey = Environment.GetEnvironmentVariable("PINECONE_API_KEY")
                ?? throw new InvalidOperationException("Pinecone API key not configured");
            var indexName = configuration["Pinecone:IndexName"] ?? "ecommerce-products";

            // Pinecone index host format: {index-name}-{project-id}.svc.{environment}.pinecone.io
            // For now, we'll need the user to provide the full host
            _indexHost = configuration["Pinecone:IndexHost"]
                ?? throw new InvalidOperationException("Pinecone Index Host not configured. Get it from Pinecone dashboard.");

            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Add("Api-Key", apiKey);
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            _embeddingService = embeddingService;
            _logger = logger;
        }

        /// <summary>
        /// Stores a product in Pinecone with its embedding
        /// </summary>
        public async Task UpsertProductAsync(Product product)
        {
            try
            {
                // Create a searchable text by combining product fields
                var searchableText = $"{product.Name}. {product.Description}. Category: {product.Category}. Tags: {string.Join(", ", product.Tags)}";

                // Generate embedding for the product
                var embedding = await _embeddingService.GenerateEmbeddingsAsync(searchableText);

                // Prepare the upsert request
                var upsertRequest = new
                {
                    vectors = new[]
                    {
                    new
                    {
                        id = product.Id.ToString(),
                        values = embedding,
                        metadata = new Dictionary<string, string>
                        {
                            ["id"] = product.Id.ToString(),
                            ["name"] = product.Name,
                            ["description"] = product.Description,
                            ["category"] = product.Category,
                            ["type"] = product.Type,
                            ["brand"] = product.Brand,
                            ["price"] = product.Price.ToString(),
                            ["pictureUrl"] = product.PictureUrl,
                            ["quantityInStock"] = product.QuantityInStock.ToString()
                        }
                    }
                }
                };

                var json = JsonSerializer.Serialize(upsertRequest);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(
                    $"https://{_indexHost}/vectors/upsert",
                    content);

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    throw new Exception($"Pinecone upsert failed: {response.StatusCode} - {error}");
                }

                _logger.LogInformation("Successfully upserted product {ProductId} to Pinecone", product.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error upserting product {ProductId} to Pinecone", product.Id);
                throw;
            }
        }

        /// <summary>
        /// Searches for products similar to the query
        /// </summary>
        public async Task<List<SearchResult>> SearchProductsAsync(string query, int topK = 10)
        {
            try
            {
                _logger.LogInformation("Searching for: {Query}", query);

                // Generate embedding for the search query
                var queryEmbedding = await _embeddingService.GenerateEmbeddingAsync(query);

                // Prepare the query request
                var queryRequest = new
                {
                    vector = queryEmbedding,
                    topK = topK,
                    includeMetadata = true
                };

                var json = JsonSerializer.Serialize(queryRequest);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(
                    $"https://{_indexHost}/query",
                    content);

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    throw new Exception($"Pinecone query failed: {response.StatusCode} - {error}");
                }

                var responseJson = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(responseJson);

                var matches = doc.RootElement.GetProperty("matches");
                var results = new List<SearchResult>();

                foreach (var match in matches.EnumerateArray())
                {
                    var metadata = match.GetProperty("metadata");
                    var score = match.GetProperty("score").GetSingle();

                    results.Add(new SearchResult
                    {
                        Product = new Product
                        {
                            Id = int.Parse(metadata.GetProperty("id").GetString() ?? "0"),
                            Name = metadata.GetProperty("name").GetString() ?? "",
                            Description = metadata.GetProperty("description").GetString() ?? "",
                            Type = metadata.GetProperty("type").GetString() ?? "",
                            Brand = metadata.GetProperty("brand").GetString() ?? "",
                            Price = long.Parse(metadata.GetProperty("price").GetString() ?? "0"),
                            PictureUrl = metadata.GetProperty("pictureUrl").GetString() ?? "",
                            QuantityInStock = int.Parse(metadata.GetProperty("quantityInStock").GetString() ?? "0")
                        },
                        Score = score
                    });
                }

                _logger.LogInformation("Found {Count} results for query: {Query}", results.Count, query);

                return results;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error searching products in Pinecone");
                throw;
            }
        }

        /// <summary>
        /// Bulk upserts multiple products
        /// </summary>
        public async Task UpsertProductsAsync(List<Product> products)
        {
            _logger.LogInformation("Bulk upserting {Count} products", products.Count);

            foreach (var product in products)
            {
                await UpsertProductAsync(product);
            }

            _logger.LogInformation("Completed bulk upsert of {Count} products", products.Count);
        }
    }
}