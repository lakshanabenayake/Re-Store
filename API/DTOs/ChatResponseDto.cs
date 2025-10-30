namespace API.DTOs
{
    public class ChatResponseDto
    {
        public string Response { get; set; } = string.Empty;
        public string Timestamp { get; set; } = DateTime.UtcNow.ToString("o");
    }
}
