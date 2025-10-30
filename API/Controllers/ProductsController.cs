using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController(StoreContext context, IMapper mapper,
        ImageService imageService, PineconeService pineconeService) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(
            [FromQuery] ProductParams productParams)
        {
            var query = context.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query,
                productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.Metadata);

            return products;
        }

        [HttpGet("{id}")] // api/products/2
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await context.Products.Select(x => x.Brand).Distinct().ToListAsync();
            var types = await context.Products.Select(x => x.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<SearchResult>>> SemanticSearch(
            [FromQuery] string query,
            [FromQuery] int topK = 10)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest("Search query cannot be empty");
            }

            try
            {
                var results = await pineconeService.SearchProductsAsync(query, topK);
                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error performing semantic search: {ex.Message}");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("index")]
        public async Task<IActionResult> IndexProducts()
        {
            try
            {
                var products = await context.Products.ToListAsync();
                await pineconeService.UpsertProductsAsync(products);
                return Ok(new { message = $"Successfully indexed {products.Count} products" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error indexing products: {ex.Message}");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("index/{id}")]
        public async Task<IActionResult> IndexProduct(int id)
        {
            var product = await context.Products.FindAsync(id);
            if (product == null) return NotFound();

            try
            {
                await pineconeService.UpsertProductAsync(product);
                return Ok(new { message = $"Successfully indexed product {id}" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error indexing product: {ex.Message}");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(CreateProductDto productDto)
        {
            var product = mapper.Map<Product>(productDto);

            if (productDto.File != null)
            {
                var imageResult = await imageService.AddImageAsync(productDto.File);

                if (imageResult.Error != null)
                {
                    return BadRequest(imageResult.Error.Message);
                }

                product.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
                product.PublicId = imageResult.PublicId;
            }

            context.Products.Add(product);

            var result = await context.SaveChangesAsync() > 0;

            if (result)
            {
                // Index the product in Pinecone
                try
                {
                    await pineconeService.UpsertProductAsync(product);
                }
                catch (Exception ex)
                {
                    // Log the error but don't fail the product creation
                    Console.WriteLine($"Error indexing product in Pinecone: {ex.Message}");
                }

                return CreatedAtAction(nameof(GetProduct), new { Id = product.Id }, product);
            }

            return BadRequest("Problem creating new procuct");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult> UpdateProduct(UpdateProductDto updateProductDto)
        {
            var product = await context.Products.FindAsync(updateProductDto.Id);

            if (product == null) return NotFound();

            mapper.Map(updateProductDto, product);

            if (updateProductDto.File != null)
            {
                var imageResult = await imageService.AddImageAsync(updateProductDto.File);

                if (imageResult.Error != null)
                    return BadRequest(imageResult.Error.Message);

                if (!string.IsNullOrEmpty(product.PublicId))
                    await imageService.DeleteImageAsync(product.PublicId);

                product.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
                product.PublicId = imageResult.PublicId;
            }

            var result = await context.SaveChangesAsync() > 0;

            if (result)
            {
                // Re-index the product in Pinecone
                try
                {
                    await pineconeService.UpsertProductAsync(product);
                }
                catch (Exception ex)
                {
                    // Log the error but don't fail the product update
                    Console.WriteLine($"Error re-indexing product in Pinecone: {ex.Message}");
                }

                return NoContent();
            }

            return BadRequest("Problem updating product");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await context.Products.FindAsync(id);

            if (product == null) return NotFound();

            if (!string.IsNullOrEmpty(product.PublicId))
                await imageService.DeleteImageAsync(product.PublicId);

            context.Products.Remove(product);

            var result = await context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest("Problem deleting the product");
        }
    }
}
