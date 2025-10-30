namespace API.Interfaces;

public interface IEmbeddingService
{
    Task<float[]> GenerateEmbeddingsAsync(string input);
}