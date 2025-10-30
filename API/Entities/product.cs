namespace API.Entities;

public class Product
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public long Price { get; set; }
    public required string PictureUrl { get; set; }
    public required string Type { get; set; }
    public required string Brand { get; set; }
    public int QuantityInStock { get; set; }
    public string? PublicId { get; set; }

    // Additional properties for semantic search
    public string Category => Type; // Using Type as Category for backward compatibility
    public string ImageUrl => PictureUrl; // Using PictureUrl as ImageUrl for backward compatibility
    public List<string> Tags => new List<string> { Brand, Type }; // Generate tags from existing fields
}
