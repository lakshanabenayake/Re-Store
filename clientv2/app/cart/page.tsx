"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Minimalist Watch",
      price: 299,
      image: "/minimalist-luxury-watch.jpg",
      quantity: 1,
      seller: "Premium Timepieces",
    },
    {
      id: 2,
      name: "Leather Bag",
      price: 449,
      image: "/premium-leather-bag.png",
      quantity: 1,
      seller: "Artisan Leather Co.",
    },
    {
      id: 3,
      name: "Ceramic Vase",
      price: 129,
      image: "/modern-ceramic-vase.png",
      quantity: 2,
      seller: "Modern Home Studio",
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(0.1)
    } else {
      setDiscount(0)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = subtotal * discount
  const shipping = subtotal > 100 ? 0 : 15
  const total = subtotal - discountAmount + shipping

  if (cartItems.length === 0) {
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
          {cartItems.map((item) => (
            <Card key={item.id} className="p-6 border-0 shadow-sm">
              <div className="flex gap-6">
                <div className="w-24 h-24 relative flex-shrink-0 rounded-lg overflow-hidden bg-secondary">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Link href={`/product/${item.id}`}>
                        <h3 className="font-medium hover:text-muted-foreground transition-colors">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">Sold by {item.seller}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-12 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 border-0 shadow-sm sticky top-20">
            <h2 className="font-serif text-2xl mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>

              {subtotal < 100 && shipping > 0 && (
                <p className="text-xs text-muted-foreground">
                  Add ${(100 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}

              <div className="border-t border-border pt-4">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mb-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" onClick={applyPromoCode} className="bg-transparent">
                  Apply
                </Button>
              </div>
              {discount > 0 && <p className="text-xs text-green-600 mt-2">Promo code applied successfully!</p>}
            </div>

            <Button asChild size="lg" className="w-full">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="w-full mt-2 bg-transparent">
              <Link href="/catalog">Continue Shopping</Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
