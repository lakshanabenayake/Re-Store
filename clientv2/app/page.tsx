import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Package, Shield, Truck } from "lucide-react"
import Image from "next/image"
import ReduxTest from "@/components/ReduxTest"

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: "Minimalist Watch",
      price: 299,
      image: "/minimalist-luxury-watch.jpg",
      category: "Accessories",
    },
    {
      id: 2,
      name: "Leather Bag",
      price: 449,
      image: "/premium-leather-bag.png",
      category: "Bags",
    },
    {
      id: 3,
      name: "Ceramic Vase",
      price: 129,
      image: "/modern-ceramic-vase.png",
      category: "Home",
    },
    {
      id: 4,
      name: "Wool Blanket",
      price: 189,
      image: "/luxury-wool-blanket.jpg",
      category: "Home",
    },
  ]

  const categories = [
    {
      name: "Fashion",
      image: "/minimalist-fashion-clothing.jpg",
      count: 124,
    },
    {
      name: "Home & Living",
      image: "/modern-home-decor.png",
      count: 89,
    },
    {
      name: "Accessories",
      image: "/luxury-accessories.png",
      count: 156,
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Redux Test Component */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <ReduxTest />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-balance mb-6">
            Curated excellence meets timeless design
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover our carefully selected collection of premium products that blend functionality with exquisite
            craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base">
              <Link href="/catalog">
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
              <Link href="/about">Learn Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore our curated collections across different lifestyle categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={`/catalog?category=${category.name.toLowerCase()}`}>
                <Card className="group overflow-hidden border-0 shadow-none hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-[4/3] relative overflow-hidden bg-secondary">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <div className="text-white">
                        <h3 className="font-serif text-2xl mb-1">{category.name}</h3>
                        <p className="text-sm text-white/80">{category.count} products</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">Featured Collection</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Handpicked items that exemplify our commitment to quality and design excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="group overflow-hidden border-0 shadow-none hover:shadow-lg transition-shadow duration-300 bg-background">
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
                    <p className="text-muted-foreground">${product.price}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/catalog">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl mb-4">Premium Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every product is carefully vetted to ensure it meets our exacting standards for craftsmanship and
                durability.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                <Package className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl mb-4">Curated Selection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our team handpicks each item, focusing on timeless design and functional excellence.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl mb-4">Fast Delivery</h3>
              <p className="text-muted-foreground leading-relaxed">
                We partner with trusted carriers to ensure your items arrive quickly and safely at your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-none bg-background">
              <div className="mb-4">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current text-foreground"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  "The quality of products here is unmatched. Every purchase feels like an investment in something truly
                  special."
                </p>
              </div>
              <div>
                <p className="font-medium">Sarah Chen</p>
                <p className="text-sm text-muted-foreground">Interior Designer</p>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-none bg-background">
              <div className="mb-4">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current text-foreground"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  "I appreciate the curation and attention to detail. It's clear that every item is chosen with care."
                </p>
              </div>
              <div>
                <p className="font-medium">Michael Torres</p>
                <p className="text-sm text-muted-foreground">Architect</p>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-none bg-background">
              <div className="mb-4">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current text-foreground"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  "Fast shipping, beautiful packaging, and products that exceed expectations. This is my go-to for
                  gifts."
                </p>
              </div>
              <div>
                <p className="font-medium">Emma Williams</p>
                <p className="text-sm text-muted-foreground">Creative Director</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6 text-balance">
            Join our community of discerning customers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Be the first to discover new arrivals and exclusive offers.
          </p>
          <Button asChild size="lg">
            <Link href="/login">Create Account</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
