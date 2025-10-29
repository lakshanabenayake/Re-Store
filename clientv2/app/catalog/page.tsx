"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useFetchProductsQuery } from "@/lib/api/catalogApi"
import ProductList from "@/components/catalog/ProductList"
import { Product } from "@/lib/models/product"

export default function CatalogPage() {
  const { data: products, isLoading, error } = useFetchProductsQuery()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 50000]) // Price in cents
  const [sortBy, setSortBy] = useState("featured")

  // Get unique categories from products
  const categories = products
    ? Array.from(new Set(products.map((p) => p.type)))
    : []

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Filter products
  let filteredProducts: Product[] = []
  if (products) {
    filteredProducts = products.filter((product) => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.type)
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
      return categoryMatch && priceMatch
    })

    // Sort products
    if (sortBy === "price-low") {
      filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
    } else if (sortBy === "name") {
      filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="p-8 text-center">
          <p className="text-destructive mb-4">Error loading products. Please try again.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">Shop All Products</h1>
        <p className="text-muted-foreground">Discover our complete collection of curated premium products.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-20 space-y-8">
            {/* Category Filter */}
            <div>
              <h3 className="font-medium mb-4">Category</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center gap-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label htmlFor={category} className="text-sm cursor-pointer">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="font-medium mb-4">Price Range</h3>
              <div className="space-y-4">
                <Slider
                  min={0}
                  max={50000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>${(priceRange[0] / 100).toFixed(2)}</span>
                  <span>${(priceRange[1] / 100).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => {
                setSelectedCategories([])
                setPriceRange([0, 50000])
              }}
            >
              Clear Filters
            </Button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort and Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <ProductList products={filteredProducts} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No products found matching your filters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategories([])
                  setPriceRange([0, 50000])
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
