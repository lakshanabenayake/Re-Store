"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, CheckCircle, XCircle } from "lucide-react"

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const products = [
    {
      id: 1,
      name: "Minimalist Watch",
      seller: "Premium Timepieces",
      price: 299,
      image: "/minimalist-luxury-watch.jpg",
      status: "Approved",
      category: "Accessories",
      sales: 45,
    },
    {
      id: 2,
      name: "Leather Bag",
      seller: "Artisan Leather Co.",
      price: 449,
      image: "/premium-leather-bag.png",
      status: "Pending",
      category: "Bags",
      sales: 0,
    },
    {
      id: 3,
      name: "Ceramic Vase",
      seller: "Modern Home Studio",
      price: 129,
      image: "/modern-ceramic-vase.png",
      status: "Approved",
      category: "Home",
      sales: 67,
    },
    {
      id: 4,
      name: "Wool Blanket",
      seller: "Cozy Textiles",
      price: 189,
      image: "/luxury-wool-blanket.jpg",
      status: "Rejected",
      category: "Home",
      sales: 0,
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || product.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-serif text-4xl md:text-5xl font-light mb-2">Product Management</h1>
        <p className="text-muted-foreground">Review and manage all platform products</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left p-4 font-medium">Product</th>
                <th className="text-left p-4 font-medium">Seller</th>
                <th className="text-left p-4 font-medium">Category</th>
                <th className="text-left p-4 font-medium">Price</th>
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
                  <td className="p-4 text-muted-foreground">{product.seller}</td>
                  <td className="p-4 text-muted-foreground">{product.category}</td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4 text-muted-foreground">{product.sales}</td>
                  <td className="p-4">
                    <Badge
                      variant="secondary"
                      className={
                        product.status === "Approved"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : product.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
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
                      {product.status === "Pending" && (
                        <>
                          <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-600">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
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
          <p className="text-muted-foreground">No products found matching your filters.</p>
        </div>
      )}
    </div>
  )
}
