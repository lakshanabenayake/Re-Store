"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { useFetchBasketQuery } from "@/lib/api/basketApi"
import CartItem from "@/components/cart/CartItem"
import OrderSummary from "@/components/cart/OrderSummary"

export default function CartPage() {
  const { data: basket, isLoading } = useFetchBasketQuery();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading cart...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!basket || basket.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
          <h1 className="font-serif text-3xl mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Start shopping to add items to your cart.</p>
          <Button asChild size="lg">
            <Link href="/catalog">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl md:text-5xl font-light mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {basket.items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
