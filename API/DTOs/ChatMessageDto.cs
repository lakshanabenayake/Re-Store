namespace API.DTOs
{
    public class ChatMessageDto
    {
        public string Message { get; set; } = string.Empty;
        public List<ConversationMessage>? ConversationHistory { get; set; }
    }

    public class ConversationMessage
    {
        public string Role { get; set; } = string.Empty; // "user" or "model"
        public string Text { get; set; } = string.Empty;
    }
}
