"use client"

import { useState } from "react"
import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, ShoppingCart, Heart, Share2, Star } from "lucide-react"

// Mock product data
const products = [
  {
    id: 1,
    name: "Minimalist Watch",
    price: 299,
    images: ["/minimalist-luxury-watch.jpg", "/luxury-watch-side-view.jpg", "/luxury-watch-back-view.jpg"],
    category: "Accessories",
    rating: 4.8,
    reviews: 124,
    description:
      "A timeless piece that combines minimalist design with precision engineering. This watch features a sleek stainless steel case, sapphire crystal glass, and a premium leather strap.",
    features: [
      "Swiss-made automatic movement",
      "Sapphire crystal glass",
      "Water resistant up to 50m",
      "Premium Italian leather strap",
      "2-year warranty",
    ],
    inStock: true,
    seller: "Premium Timepieces",
  },
  {
    id: 2,
    name: "Leather Bag",
    price: 449,
    images: ["/premium-leather-bag.png", "/leather-bag-interior-view.jpg", "/leather-bag-side-view.jpg"],
    category: "Bags",
    rating: 4.9,
    reviews: 89,
    description:
      "Handcrafted from full-grain leather, this bag is designed to age beautifully while providing ample space for your daily essentials. Perfect for work or travel.",
    features: [
      "Full-grain Italian leather",
      "Multiple interior compartments",
      "Adjustable shoulder strap",
      "Brass hardware",
      "Lifetime warranty",
    ],
    inStock: true,
    seller: "Artisan Leather Co.",
  },
]

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const productId = Number.parseInt(resolvedParams.id)
  const product = products.find((p) => p.id === productId) || products[0]

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const relatedProducts = [
    {
      id: 3,
      name: "Ceramic Vase",
      price: 129,
      image: "/modern-ceramic-vase.png",
    },
    {
      id: 4,
      name: "Wool Blanket",
      price: 189,
      image: "/luxury-wool-blanket.jpg",
    },
    {
      id: 5,
      name: "Silk Scarf",
      price: 159,
      image: "/luxury-silk-scarf.png",
    },
    {
      id: 6,
      name: "Leather Wallet",
      price: 89,
      image: "/minimalist-leather-wallet.jpg",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/catalog" className="hover:text-foreground">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/catalog?category=${product.category.toLowerCase()}`} className="hover:text-foreground">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-secondary">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square relative overflow-hidden rounded-lg bg-secondary border-2 transition-colors ${
                  selectedImage === index ? "border-foreground" : "border-transparent"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "fill-foreground text-foreground" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            <p className="text-3xl font-light mb-4">${product.price}</p>
            {product.inStock ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                In Stock
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                Out of Stock
              </Badge>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button asChild size="lg" className="flex-1">
                <Link href="/cart">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Link>
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                <Heart className="mr-2 h-5 w-5" />
                Save
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Seller Info */}
          <Card className="p-4 bg-secondary border-0">
            <p className="text-sm text-muted-foreground mb-1">Sold by</p>
            <p className="font-medium">{product.seller}</p>
          </Card>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-24">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="features"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
            >
              Features
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
            >
              Shipping & Returns
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
            >
              Reviews ({product.reviews})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="mt-8">
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-muted-foreground mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="shipping" className="mt-8">
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Free Shipping:</strong> On orders over $100
              </p>
              <p>
                <strong className="text-foreground">Delivery Time:</strong> 3-5 business days
              </p>
              <p>
                <strong className="text-foreground">Returns:</strong> 30-day return policy. Items must be unused and in
                original packaging.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-8">
            <div className="space-y-6">
              {[
                {
                  name: "Alex Johnson",
                  rating: 5,
                  date: "2 weeks ago",
                  comment: "Absolutely love this product! The quality is outstanding and it exceeded my expectations.",
                },
                {
                  name: "Sarah Miller",
                  rating: 5,
                  date: "1 month ago",
                  comment: "Beautiful craftsmanship and attention to detail. Worth every penny.",
                },
                {
                  name: "Michael Chen",
                  rating: 4,
                  date: "2 months ago",
                  comment: "Great product overall. Shipping was fast and packaging was excellent.",
                },
              ].map((review, index) => (
                <Card key={index} className="p-6 border-0 bg-secondary">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-foreground text-foreground" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="font-serif text-3xl md:text-4xl font-light mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
              <Card className="group overflow-hidden border-0 shadow-none hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-square relative overflow-hidden bg-secondary">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">{relatedProduct.name}</h3>
                  <p className="text-muted-foreground">${relatedProduct.price}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
