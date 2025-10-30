"use client"

import { ShoppingBag, Zap, Shield, Headphones } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">About ReStore-Corp</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your trusted destination for quality products with cutting-edge semantic search technology
        </p>
      </div>

      {/* Mission Statement */}
      <div className="max-w-4xl mx-auto mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-muted-foreground space-y-4">
            <p>
              At ReStore-Corp, we're revolutionizing online shopping by combining a carefully curated 
              selection of products with advanced AI-powered search technology. Our mission is to make 
              finding exactly what you need as simple as describing it in your own words.
            </p>
            <p>
              We believe shopping should be intuitive, efficient, and enjoyable. That's why we've 
              integrated semantic search powered by Google Gemini and Pinecone vector database, allowing 
              you to search naturally and discover products that truly match your needs.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose ReStore?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Smart Search</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our AI-powered semantic search understands what you mean, not just what you type. 
                Find products naturally using everyday language.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Quality Products</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Carefully curated selection across electronics, sports, home & kitchen, clothing, 
                and more. Every product meets our high standards.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Secure Shopping</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your security is our priority. We use industry-standard encryption and secure 
                payment processing to protect your information.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Headphones className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>24/7 Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our dedicated customer support team is always here to help. Get assistance 
                whenever you need it.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Technology Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Powered by Advanced Technology</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">🔍 Semantic Search</h3>
              <p className="text-muted-foreground">
                Using Google Gemini's advanced language models and Pinecone's vector database, 
                our search understands context and intent. Search for "comfortable running shoes" 
                and we'll find products that match not just the keywords, but the meaning behind them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">⚡ Fast & Responsive</h3>
              <p className="text-muted-foreground">
                Built with modern web technologies including Next.js 15 and React, delivering 
                lightning-fast page loads and smooth interactions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">🎨 Beautiful Design</h3>
              <p className="text-muted-foreground">
                Clean, modern interface with dark/light mode support. Built with Tailwind CSS 
                and shadcn/ui components for a premium user experience.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Categories */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Shop Our Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Electronics",
            "Sports & Outdoors",
            "Home & Kitchen",
            "Clothing",
            "Furniture",
            "Beauty & Personal Care",
            "Musical Instruments",
            "Food & Beverages"
          ].map((category) => (
            <Card key={category} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <p className="font-semibold">{category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-secondary rounded-lg p-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Products</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">8</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Secure</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Card className="max-w-2xl mx-auto bg-primary text-primary-foreground">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Smart Shopping?</h2>
            <p className="text-lg mb-6 opacity-90">
              Try our semantic search and discover products in a whole new way
            </p>
            <div className="flex gap-4 justify-center">
              <a 
                href="/catalog" 
                className="bg-background text-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
              >
                Browse Products
              </a>
              <a 
                href="/search" 
                className="border-2 border-background text-background px-6 py-3 rounded-md font-semibold hover:bg-background hover:text-foreground transition-colors"
              >
                Try Smart Search
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
