"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload } from "lucide-react"

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    sku: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New product:", formData)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href="/seller/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-light mb-2">Add New Product</h1>
          <p className="text-muted-foreground">Create a new product listing</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="p-6 border-0 shadow-sm">
            <h2 className="font-serif text-2xl mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Minimalist Watch"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={6}
                  className="mt-1.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger id="category" className="mt-1.5">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="home">Home & Living</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="bags">Bags</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    placeholder="e.g., WATCH-001"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Pricing & Inventory */}
          <Card className="p-6 border-0 shadow-sm">
            <h2 className="font-serif text-2xl mb-6">Pricing & Inventory</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required
                  min="0"
                  className="mt-1.5"
                />
              </div>
            </div>
          </Card>

          {/* Images */}
          <Card className="p-6 border-0 shadow-sm">
            <h2 className="font-serif text-2xl mb-6">Product Images</h2>
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-2">Drag and drop images here, or click to browse</p>
              <p className="text-sm text-muted-foreground">Supports: JPG, PNG (Max 5MB)</p>
              <Button type="button" variant="outline" className="mt-4 bg-transparent">
                Choose Files
              </Button>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button type="submit" size="lg" className="flex-1">
              Publish Product
            </Button>
            <Button asChild type="button" variant="outline" size="lg" className="flex-1 bg-transparent">
              <Link href="/seller/products">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
