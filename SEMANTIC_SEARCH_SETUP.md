# Semantic Search Setup Guide

## Overview

This guide will help you set up semantic search functionality using Gemini embeddings and Pinecone vector database.

## Prerequisites

1. **Pinecone Account**

   - Sign up at https://www.pinecone.io/
   - Create a new index with:
     - Dimensions: 768 (for Gemini text-embedding-004 model)
     - Metric: cosine
     - Note down your Index Host (e.g., `your-index-xxxxxxxx.svc.environment.pinecone.io`)

2. **Google Gemini API Key**
   - Go to https://makersuite.google.com/app/apikey
   - Create an API key

## Environment Variables

Add the following to your `.env` file in the API directory:

```env
# Existing variables...
DB_SERVER=your_server
DB_NAME=your_db
DB_USER=your_user
DB_PASSWORD=your_password
CORS_ORIGIN=http://localhost:3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Semantic Search - ADD THESE
GEMINI_API_KEY=your_gemini_api_key_here
PINECONE_API_KEY=your_pinecone_api_key_here
```

Add the following to your `appsettings.json`:

```json
{
  "Pinecone": {
    "IndexName": "ecommerce-products",
    "IndexHost": "your-index-xxxxxxxx.svc.environment.pinecone.io"
  }
}
```

## API Endpoints

### 1. Semantic Search

Search for products using natural language:

```http
GET /api/products/search?query=red shoes for running&topK=10
```

### 2. Index All Products (Admin Only)

Index all existing products in Pinecone:

```http
POST /api/products/index
Authorization: Required (Admin role)
```

### 3. Index Single Product (Admin Only)

Index a specific product:

```http
POST /api/products/index/{productId}
Authorization: Required (Admin role)
```

## How It Works

1. **Product Creation/Update**: When a product is created or updated, it's automatically indexed in Pinecone with its embedding.

2. **Semantic Search**:

   - User query is converted to an embedding using Gemini
   - Pinecone searches for similar product embeddings
   - Returns products ranked by similarity score

3. **Searchable Fields**: The system creates embeddings from:
   - Product Name
   - Description
   - Category/Type
   - Brand

## Testing the Setup

1. **Start the API**:

   ```bash
   cd API
   dotnet run
   ```

2. **Index existing products** (one-time setup):

   ```bash
   # Using curl (requires admin authentication)
   curl -X POST http://localhost:5000/api/products/index \
     -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
   ```

3. **Test semantic search**:
   ```bash
   # Search for products
   curl "http://localhost:5000/api/products/search?query=comfortable running shoes&topK=5"
   ```

## Example Queries

Try these natural language queries:

- "red leather shoes"
- "comfortable running gear"
- "winter jacket for hiking"
- "affordable electronics"
- "gifts for developers"

## Troubleshooting

### Error: "Pinecone API key not configured"

- Ensure `PINECONE_API_KEY` is set in your `.env` file

### Error: "Pinecone Index Host not configured"

- Add the `IndexHost` to your `appsettings.json` under `Pinecone` section
- Get the host from your Pinecone dashboard

### Error: "Gemini API error"

- Verify your `GEMINI_API_KEY` is correct
- Check API quota limits at https://makersuite.google.com/

### Products not returning in search

- Make sure products are indexed first using the `/api/products/index` endpoint
- Check Pinecone dashboard to verify vectors are stored

## Frontend Integration

To add a semantic search UI to your Next.js client:

### 1. Create a search API hook:

```typescript
// lib/api/searchApi.ts
import { baseApi } from "./baseApi";

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    semanticSearch: builder.query({
      query: ({ query, topK = 10 }) => ({
        url: `/products/search?query=${encodeURIComponent(query)}&topK=${topK}`,
      }),
    }),
  }),
});

export const { useSemanticSearchQuery, useLazySemanticSearchQuery } = searchApi;
```

### 2. Update the navbar search:

```typescript
// In navbar.tsx, replace the search input with:
const [searchQuery, setSearchQuery] = useState("");
const [trigger, { data: searchResults, isLoading }] =
  useLazySemanticSearchQuery();

const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  if (searchQuery.trim()) {
    trigger({ query: searchQuery });
    // Navigate to results page or show modal
  }
};
```

## Performance Considerations

- **Cold Start**: First search might be slower (Gemini API + Pinecone query)
- **Batch Indexing**: Use the bulk index endpoint for initial setup
- **Caching**: Consider caching frequent queries
- **Rate Limits**: Both Gemini and Pinecone have rate limits on free tiers

## Next Steps

1. Set up environment variables
2. Index your existing products
3. Test semantic search with various queries
4. Integrate search UI in your frontend
5. Monitor usage in Pinecone and Gemini dashboards
