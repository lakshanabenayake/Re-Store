# Semantic Search Implementation Summary

## ✅ What Has Been Implemented

### Backend (API)

1. **DTOs Created**

   - `SearchResult.cs` - Contains product and similarity score

2. **Services Configured**

   - `GeminiEmbeddingService` - Generates embeddings using Google's Gemini API
   - `PineconeService` - Manages vector storage and similarity search

3. **Product Entity Updated**

   - Added computed properties: `Category`, `ImageUrl`, `Tags` for backward compatibility

4. **ProductsController Enhanced**

   - `GET /api/products/search` - Semantic search endpoint
   - `POST /api/products/index` - Index all products (Admin only)
   - `POST /api/products/index/{id}` - Index single product (Admin only)
   - Automatic indexing on product creation/update

5. **Program.cs Updated**
   - Registered `IEmbeddingService` and `PineconeService`

### Frontend (Next.js)

1. **API Layer**

   - `searchApi.ts` - RTK Query hooks for semantic search

2. **Redux Store**

   - Integrated `searchApi` into store configuration

3. **UI Components**
   - `skeleton.tsx` - Loading skeleton component
   - `app/search/page.tsx` - Full semantic search page with UI

## 🚀 Quick Start Guide

### Step 1: Set Environment Variables

Add to your `.env` file in the API directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PINECONE_API_KEY=your_pinecone_api_key_here
```

Add to `appsettings.json`:

```json
{
  "Pinecone": {
    "IndexName": "ecommerce-products",
    "IndexHost": "your-index-xxxxx.svc.environment.pinecone.io"
  }
}
```

### Step 2: Create Pinecone Index

1. Go to https://www.pinecone.io/
2. Create a new index with:
   - **Dimensions**: 768
   - **Metric**: cosine
   - Copy the Index Host URL

### Step 3: Get API Keys

**Gemini API Key:**

- Visit: https://makersuite.google.com/app/apikey
- Create and copy your API key

**Pinecone API Key:**

- From your Pinecone dashboard
- Go to API Keys section

### Step 4: Index Your Products

After starting your API, make an authenticated POST request (Admin only):

```bash
curl -X POST http://localhost:5000/api/products/index \
  -H "Cookie: your-auth-cookie"
```

Or use the API endpoint from your admin panel once logged in.

### Step 5: Test Semantic Search

Navigate to: `http://localhost:3000/search`

Try queries like:

- "comfortable running shoes"
- "leather winter jacket"
- "affordable gaming laptop"

## 📋 API Endpoints Reference

### Public Endpoints

**Semantic Search**

```http
GET /api/products/search?query=red+shoes&topK=10
```

Response:

```json
[
  {
    "product": {
      "id": 1,
      "name": "Product Name",
      "description": "Description",
      "price": 9999,
      "pictureUrl": "url",
      "type": "Type",
      "brand": "Brand",
      "quantityInStock": 10
    },
    "score": 0.85
  }
]
```

### Admin Endpoints

**Index All Products**

```http
POST /api/products/index
Authorization: Required (Admin role)
```

**Index Single Product**

```http
POST /api/products/index/{productId}
Authorization: Required (Admin role)
```

## 🎯 Frontend Usage Examples

### Using the Search Hook

```typescript
import { useLazySemanticSearchQuery } from "@/lib/api/searchApi";

function MyComponent() {
  const [trigger, { data, isLoading }] = useLazySemanticSearchQuery();

  const handleSearch = (query: string) => {
    trigger({ query, topK: 10 });
  };

  return <div>{/* Your search UI */}</div>;
}
```

### Integrating Search in Navbar

Update your navbar search to use semantic search:

```typescript
const [searchQuery, setSearchQuery] = useState("");
const router = useRouter();

const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  if (searchQuery.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  }
};
```

## 🔧 How It Works

### Flow Diagram

```
User Query → Gemini Embedding → Pinecone Search → Results
                 ↓                      ↓
            768D Vector          Similarity Score
```

### Product Indexing

1. Product text is created from: Name + Description + Category + Brand
2. Text is sent to Gemini to generate a 768-dimensional embedding
3. Embedding + metadata stored in Pinecone with product ID

### Search Process

1. User query converted to embedding via Gemini
2. Pinecone finds most similar product embeddings (cosine similarity)
3. Returns products ranked by similarity score (0-1)

## 🎨 Customization Options

### Adjust Search Results Count

```typescript
trigger({ query: "your query", topK: 20 }); // Get 20 results
```

### Filter by Score Threshold

```typescript
const filteredResults = data?.filter((r) => r.score > 0.7);
```

### Customize Searchable Fields

Edit `PineconeService.cs`:

```csharp
var searchableText = $"{product.Name}. {product.Description}. " +
                     $"Category: {product.Category}. " +
                     $"Brand: {product.Brand}. " +
                     $"Custom field: {product.CustomField}";
```

## 📊 Performance Tips

1. **Batch Index Products**: Use the bulk index endpoint for initial setup
2. **Cache Frequent Queries**: Consider implementing Redis cache for popular searches
3. **Async Indexing**: Indexing happens in background - won't slow down product creation
4. **Monitor Usage**: Check Gemini and Pinecone dashboards for API usage

## 🐛 Troubleshooting

### "Pinecone API key not configured"

- Check `.env` file has `PINECONE_API_KEY=...`
- Restart your API after adding

### "Gemini API error"

- Verify API key is valid
- Check quota limits at https://makersuite.google.com/

### No search results

- Make sure products are indexed first
- Check Pinecone dashboard for stored vectors
- Verify index dimensions match (768)

### Frontend search not working

- Check Redux store includes `searchApi`
- Verify API URL in environment variables
- Check browser console for errors

## 🔐 Security Notes

- Index endpoints require Admin role authentication
- Search endpoint is public (consider rate limiting for production)
- API keys should never be committed to version control
- Use `.env` files and keep them in `.gitignore`

## 📈 Next Steps

1. ✅ Set up environment variables
2. ✅ Create Pinecone index
3. ✅ Index your products
4. ✅ Test semantic search
5. 🔲 Add search to navbar
6. 🔲 Implement search analytics
7. 🔲 Add filters to search results
8. 🔲 Implement query suggestions

## 📚 Additional Resources

- [Pinecone Documentation](https://docs.pinecone.io/)
- [Google Gemini API](https://ai.google.dev/docs)
- [Vector Search Explained](https://www.pinecone.io/learn/what-is-similarity-search/)

---

For detailed setup instructions, see: `SEMANTIC_SEARCH_SETUP.md`
