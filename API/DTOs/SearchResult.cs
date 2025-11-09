using API.Entities;

namespace API.DTOs
{
    public class SearchResult
    {
        public Product Product { get; set; } = null!;
        public float Score { get; set; }
    }
}
