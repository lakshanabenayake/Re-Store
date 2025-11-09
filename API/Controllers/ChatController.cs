using API.DTOs;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ChatController(GeminiChatService chatService) : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult<ChatResponseDto>> SendMessage([FromBody] ChatMessageDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest("Message cannot be empty");
            }

            try
            {
                // Get user email if authenticated
                string? userEmail = null;
                if (User.Identity?.IsAuthenticated == true)
                {
                    userEmail = User.GetUsername();
                }

                // Convert conversation history to the format expected by GeminiChatService
                List<object>? conversationHistory = null;
                if (request.ConversationHistory != null && request.ConversationHistory.Any())
                {
                    conversationHistory = request.ConversationHistory
                        .Select(msg => (object)new
                        {
                            role = msg.Role,
                            parts = new[]
                            {
                                new { text = msg.Text }
                            }
                        })
                        .ToList();
                }

                var response = await chatService.ChatAsync(request.Message, userEmail, conversationHistory);

                return Ok(new ChatResponseDto
                {
                    Response = response
                });
            }
            catch (Exception)
            {
                return StatusCode(500, new ChatResponseDto
                {
                    Response = "I apologize, but I encountered an error processing your request. Please try again."
                });
            }
        }

        [HttpGet("health")]
        public IActionResult HealthCheck()
        {
            return Ok(new { status = "healthy", service = "AI Chat Assistant" });
        }
    }
}
