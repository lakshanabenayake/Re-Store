import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Shield, Truck, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Electronics",
      price: 299,
      image: "/minimalist-luxury-watch.jpg",
      category: "Electronics",
    },
    {
      id: 2,
      name: "Home Essentials",
      price: 449,
      image: "/premium-leather-bag.png",
      category: "Home",
    },
    {
      id: 3,
      name: "Garden Tools",
      price: 129,
      image: "/modern-ceramic-vase.png",
      category: "Garden",
    },
    {
      id: 4,
      name: "Apparel Collection",
      price: 189,
      image: "/luxury-wool-blanket.jpg",
      category: "Apparel",
    },
  ]

  const categories = [
    {
      name: "Electronics",
      image: "/minimalist-fashion-clothing.jpg",
      count: 324,
    },
    {
      name: "Home & Garden",
      image: "/modern-home-decor.png",
      count: 456,
    },
    {
      name: "Apparel",
      image: "/luxury-accessories.png",
      count: 678,
    },
  ]

  return (
    <div className="flex flex-col">
      <section className="relative h-[90vh] flex items-center justify-center bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance mb-6">
            Your Trusted Retail Partner
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed opacity-90">
            Discover quality products across electronics, home, garden, and apparel. Trusted by millions of customers
            worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base bg-background text-primary hover:bg-background/90">
              <Link href="/catalog">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Browse our extensive selection across multiple product categories.
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
                        <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore our best-selling items across all categories.
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
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-primary font-semibold">${product.price}</p>
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

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Quality Assured</h3>
              <p className="text-muted-foreground leading-relaxed">
                All products meet our rigorous quality standards and come with comprehensive warranties.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 mb-6">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Best Value</h3>
              <p className="text-muted-foreground leading-relaxed">
                Competitive pricing with regular promotions and loyalty rewards for our valued customers.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 mb-6">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Fast Shipping</h3>
              <p className="text-muted-foreground leading-relaxed">
                Reliable delivery with real-time tracking and multiple shipping options available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2M+</div>
              <p className="text-primary-foreground/80">Active Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <p className="text-primary-foreground/80">Products</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <p className="text-primary-foreground/80">Countries</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.8%</div>
              <p className="text-primary-foreground/80">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Customer Reviews</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border shadow-none">
              <div className="mb-4">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current text-primary"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  "Excellent selection and fast delivery. RetailCorp has become my go-to for all my shopping needs."
                </p>
              </div>
              <div>
                <p className="font-semibold">John Smith</p>
                <p className="text-sm text-muted-foreground">Verified Customer</p>
              </div>
            </Card>

            <Card className="p-8 border shadow-none">
              <div className="mb-4">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current text-primary"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  "Great customer service and competitive prices. Highly recommend RetailCorp to anyone."
                </p>
              </div>
              <div>
                <p className="font-semibold">Maria Garcia</p>
                <p className="text-sm text-muted-foreground">Verified Customer</p>
              </div>
            </Card>

            <Card className="p-8 border shadow-none">
              <div className="mb-4">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current text-primary"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  "Wide variety of products at great prices. The website is easy to navigate and checkout is seamless."
                </p>
              </div>
              <div>
                <p className="font-semibold">David Chen</p>
                <p className="text-sm text-muted-foreground">Verified Customer</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Join Millions of Satisfied Customers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Create an account today and enjoy exclusive deals, faster checkout, and personalized recommendations.
          </p>
          <Button asChild size="lg" className="text-base">
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
