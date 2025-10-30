"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"

export default function SellerProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const products = [
    {
      id: 1,
      name: "Minimalist Watch",
      price: 299,
      image: "/minimalist-luxury-watch.jpg",
      stock: 12,
      sales: 45,
      status: "Active",
      category: "Accessories",
    },
    {
      id: 2,
      name: "Leather Bag",
      price: 449,
      image: "/premium-leather-bag.png",
      stock: 8,
      sales: 32,
      status: "Active",
      category: "Bags",
    },
    {
      id: 3,
      name: "Ceramic Vase",
      price: 129,
      image: "/modern-ceramic-vase.png",
      stock: 0,
      sales: 67,
      status: "Out of Stock",
      category: "Home",
    },
    {
      id: 4,
      name: "Wool Blanket",
      price: 189,
      image: "/luxury-wool-blanket.jpg",
      stock: 15,
      sales: 28,
      status: "Active",
      category: "Home",
    },
  ]

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl font-light mb-2">My Products</h1>
          <p className="text-muted-foreground">Manage your product listings</p>
        </div>
        <Button asChild size="lg">
          <Link href="/seller/products/new">
            <Plus className="mr-2 h-5 w-5" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Products Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left p-4 font-medium">Product</th>
                <th className="text-left p-4 font-medium">Category</th>
                <th className="text-left p-4 font-medium">Price</th>
                <th className="text-left p-4 font-medium">Stock</th>
                <th className="text-left p-4 font-medium">Sales</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t border-border">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{product.category}</td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">
                    <span
                      className={product.stock === 0 ? "text-red-600" : product.stock < 10 ? "text-yellow-600" : ""}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">{product.sales}</td>
                  <td className="p-4">
                    <Badge
                      variant="secondary"
                      className={
                        product.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                      }
                    >
                      {product.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/product/${product.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/seller/products/${product.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your search.</p>
        </div>
      )}
    </div>
  )
}
