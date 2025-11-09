"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Minus, Plus, ShoppingCart, Heart, Share2, ArrowLeft } from "lucide-react"
import { useFetchProductDetailsQuery } from "@/lib/api/catalogApi"
import { useAddBasketItemMutation, useFetchBasketQuery, useRemoveBasketItemMutation } from "@/lib/api/basketApi"
import { currencyFormat } from "@/lib/util"
import { toast } from "sonner"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const productId = Number.parseInt(resolvedParams.id)
  
  const { data: product, isLoading } = useFetchProductDetailsQuery(productId)
  const { data: basket } = useFetchBasketQuery()
  const [addBasketItem, { isLoading: isAdding }] = useAddBasketItemMutation()
  const [removeBasketItem, { isLoading: isRemoving }] = useRemoveBasketItemMutation()
  
  const item = basket?.items.find(x => x.productId === productId)
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    if (item) setQuantity(item.quantity)
    else setQuantity(1)
  }, [item])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">Product not found</p>
          <Button asChild>
            <Link href="/catalog">Back to Catalog</Link>
          </Button>
        </Card>
      </div>
    )
  }

  const handleUpdateBasket = async () => {
    try {
      const updatedQuantity = item ? Math.abs(quantity - item.quantity) : quantity
      
      if (!item || quantity > item.quantity) {
        await addBasketItem({ product, quantity: updatedQuantity }).unwrap()
        toast.success('Cart updated successfully!')
      } else {
        await removeBasketItem({ productId: product.id, quantity: updatedQuantity }).unwrap()
        toast.success('Cart updated successfully!')
      }
    } catch (error) {
      toast.error('Failed to update cart')
      console.error('Update basket error:', error)
    }
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0 && newQuantity <= product.quantityInStock) {
      setQuantity(newQuantity)
    }
  }

  const productDetails = [
    { label: 'Name', value: product.name },
    { label: 'Description', value: product.description },
    { label: 'Type', value: product.type },
    { label: 'Brand', value: product.brand },
    { label: 'Quantity in stock', value: product.quantityInStock },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/catalog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Catalog
        </Link>
      </Button>

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
        <Link href={`/catalog?type=${product.type.toLowerCase()}`} className="hover:text-foreground">
          {product.type}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        {/* Image */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-secondary">
            <Image
              src={product.pictureUrl || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2 uppercase">{product.type}</p>
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">{product.name}</h1>
            <p className="text-sm text-muted-foreground mb-4">{product.brand}</p>
            <p className="text-3xl font-light mb-4">{currencyFormat(product.price)}</p>
            {product.quantityInStock > 0 ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                In Stock ({product.quantityInStock} available)
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                Out of Stock
              </Badge>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Quantity and Add to Cart */}
          {product.quantityInStock > 0 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1 || isAdding || isRemoving}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(Number(e.target.value))}
                      className="w-20 text-center border-0 focus-visible:ring-0"
                      min={1}
                      max={product.quantityInStock}
                      disabled={isAdding || isRemoving}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.quantityInStock || isAdding || isRemoving}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={handleUpdateBasket}
                    disabled={quantity === item?.quantity || (!item && quantity === 0) || isAdding || isRemoving}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {isAdding || isRemoving ? 'Updating...' : item ? 'Update Cart' : 'Add to Cart'}
                  </Button>
                </div>
                {item && (
                  <p className="text-sm text-muted-foreground">
                    Currently in cart: {item.quantity}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                  <Heart className="mr-2 h-5 w-5" />
                  Save for Later
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Table */}
      <div className="mb-24">
        <h2 className="font-serif text-3xl font-light mb-6">Product Details</h2>
        <Card className="p-6 border-0 shadow-sm">
          <div className="space-y-4">
            {productDetails.map((detail, index) => (
              <div key={index} className="flex border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="w-1/3 font-medium">{detail.label}</div>
                <div className="w-2/3 text-muted-foreground">{detail.value}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Shipping Info */}
      <div className="mb-24">
        <h2 className="font-serif text-3xl font-light mb-6">Shipping & Returns</h2>
        <Card className="p-6 border-0 shadow-sm">
          <div className="space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">Free Shipping:</strong> On orders over {currencyFormat(10000)}
            </p>
            <p>
              <strong className="text-foreground">Delivery Time:</strong> 3-5 business days
            </p>
            <p>
              <strong className="text-foreground">Returns:</strong> 30-day return policy. Items must be unused and in
              original packaging.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
