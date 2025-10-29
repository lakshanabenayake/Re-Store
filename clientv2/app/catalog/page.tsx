"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

// Mock product data
const allProducts = [
  {
    id: 1,
    name: "Minimalist Watch",
    price: 299,
    image: "/minimalist-luxury-watch.jpg",
    category: "Accessories",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Leather Bag",
    price: 449,
    image: "/premium-leather-bag.png",
    category: "Bags",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Ceramic Vase",
    price: 129,
    image: "/modern-ceramic-vase.png",
    category: "Home",
    rating: 4.7,
    reviews: 56,
  },
  {
    id: 4,
    name: "Wool Blanket",
    price: 189,
    image: "/luxury-wool-blanket.jpg",
    category: "Home",
    rating: 4.9,
    reviews: 203,
  },
  {
    id: 5,
    name: "Silk Scarf",
    price: 159,
    image: "/luxury-silk-scarf.png",
    category: "Accessories",
    rating: 4.6,
    reviews: 78,
  },
  {
    id: 6,
    name: "Leather Wallet",
    price: 89,
    image: "/minimalist-leather-wallet.jpg",
    category: "Accessories",
    rating: 4.8,
    reviews: 145,
  },
  {
    id: 7,
    name: "Cotton Throw Pillow",
    price: 69,
    image: "/modern-cotton-throw-pillow.jpg",
    category: "Home",
    rating: 4.5,
    reviews: 92,
  },
  {
    id: 8,
    name: "Cashmere Sweater",
    price: 329,
    image: "/luxury-cashmere-sweater.png",
    category: "Fashion",
    rating: 4.9,
    reviews: 167,
  },
  {
    id: 9,
    name: "Wooden Desk Organizer",
    price: 79,
    image: "/minimalist-wooden-desk-organizer.jpg",
    category: "Home",
    rating: 4.7,
    reviews: 134,
  },
  {
    id: 10,
    name: "Linen Shirt",
    price: 119,
    image: "/premium-linen-shirt.png",
    category: "Fashion",
    rating: 4.6,
    reviews: 98,
  },
  {
    id: 11,
    name: "Leather Belt",
    price: 99,
    image: "/classic-leather-belt.jpg",
    category: "Accessories",
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 12,
    name: "Glass Carafe",
    price: 59,
    image: "/elegant-glass-carafe.jpg",
    category: "Home",
    rating: 4.7,
    reviews: 87,
  },
]

export default function CatalogPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState("featured")

  const categories = ["Fashion", "Home", "Accessories", "Bags"]

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Filter products
  let filteredProducts = allProducts.filter((product) => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
    return categoryMatch && priceMatch
  })

  // Sort products
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating)
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
                  max={500}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => {
                setSelectedCategories([])
                setPriceRange([0, 500])
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
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Card className="group overflow-hidden border-0 shadow-none hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-square relative overflow-hidden bg-secondary">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                      <h3 className="font-medium mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground">${product.price}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span>★</span>
                          <span>{product.rating}</span>
                          <span>({product.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No products found matching your filters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategories([])
                  setPriceRange([0, 500])
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
