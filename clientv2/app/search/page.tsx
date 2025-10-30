"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLazySemanticSearchQuery } from "@/lib/api/searchApi"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import Image from "next/image"

export default function SemanticSearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [trigger, { data: searchResults, isLoading, isFetching }] = useLazySemanticSearchQuery()

  // Check for query parameter on mount
  useEffect(() => {
    const queryFromUrl = searchParams.get('q')
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl)
      trigger({ query: queryFromUrl, topK: 12 })
    }
  }, [searchParams, trigger])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      trigger({ query: searchQuery, topK: 12 })
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price / 100)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Smart Product Search</h1>
          <p className="text-muted-foreground">
            Use natural language to find exactly what you're looking for
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Try: 'red running shoes' or 'affordable laptop for gaming'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 text-lg"
              />
            </div>
            <Button type="submit" size="lg" disabled={isLoading || isFetching}>
              {isLoading || isFetching ? "Searching..." : "Search"}
            </Button>
          </div>
        </form>

        {/* Example Queries */}
        {!searchResults && (
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-3">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "comfortable running shoes",
                "leather winter jacket",
                "affordable wireless headphones",
                "gaming laptop under $1000"
              ].map((example) => (
                <Badge
                  key={example}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => {
                    setSearchQuery(example)
                    trigger({ query: example, topK: 12 })
                  }}
                >
                  {example}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {(isLoading || isFetching) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-48 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Search Results */}
        {searchResults && searchResults.length > 0 && !isLoading && !isFetching && (
          <div>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Found {searchResults.length} results for "{searchQuery}"
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((result) => (
                <Link 
                  key={result.product.id} 
                  href={`/product/${result.product.id}`}
                  className="group"
                >
                  <Card className="h-full transition-all hover:shadow-lg">
                    <CardHeader className="p-0">
                      <div className="relative w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                        <Image
                          src={result.product.pictureUrl}
                          alt={result.product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary">
                            {(result.score * 100).toFixed(0)}% match
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                        {result.product.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 mb-3">
                        {result.product.description}
                      </CardDescription>
                      <div className="flex gap-2 mb-2">
                        <Badge variant="outline">{result.product.brand}</Badge>
                        <Badge variant="outline">{result.product.type}</Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(result.product.price)}
                      </span>
                      {result.product.quantityInStock > 0 ? (
                        <Badge variant="default">In Stock</Badge>
                      ) : (
                        <Badge variant="destructive">Out of Stock</Badge>
                      )}
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {searchResults && searchResults.length === 0 && !isLoading && !isFetching && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              No results found for "{searchQuery}"
            </p>
            <p className="text-sm text-muted-foreground">
              Try different keywords or browse our catalog
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
