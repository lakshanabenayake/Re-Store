"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Lock } from "lucide-react"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [sameAsShipping, setSameAsShipping] = useState(true)

  const cartItems = [
    { id: 1, name: "Minimalist Watch", price: 299, quantity: 1 },
    { id: 2, name: "Leather Bag", price: 449, quantity: 1 },
    { id: 3, name: "Ceramic Vase", price: 129, quantity: 2 },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl font-light mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <Card className="p-6 border-0 shadow-sm">
              <h2 className="font-serif text-2xl mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" className="mt-1.5" />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="newsletter" />
                  <Label htmlFor="newsletter" className="text-sm font-normal cursor-pointer">
                    Email me with news and offers
                  </Label>
                </div>
              </div>
            </Card>

            {/* Shipping Address */}
            <Card className="p-6 border-0 shadow-sm">
              <h2 className="font-serif text-2xl mb-6">Shipping Address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                  <Input id="apartment" placeholder="Apt 4B" className="mt-1.5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="NY" className="mt-1.5" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input id="zipCode" placeholder="10001" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" className="mt-1.5" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6 border-0 shadow-sm">
              <h2 className="font-serif text-2xl mb-6">Payment Method</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4 mb-6">
                <div className="flex items-center space-x-2 border border-border rounded-lg p-4">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                    <CreditCard className="h-5 w-5" />
                    <span>Credit / Debit Card</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border border-border rounded-lg p-4">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="cursor-pointer flex-1">
                    PayPal
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1.5" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" className="mt-1.5" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" className="mt-1.5" />
                  </div>
                </div>
              )}
            </Card>

            {/* Billing Address */}
            <Card className="p-6 border-0 shadow-sm">
              <h2 className="font-serif text-2xl mb-6">Billing Address</h2>
              <div className="flex items-center gap-2 mb-4">
                <Checkbox id="sameAsShipping" checked={sameAsShipping} onCheckedChange={setSameAsShipping} />
                <Label htmlFor="sameAsShipping" className="text-sm font-normal cursor-pointer">
                  Same as shipping address
                </Label>
              </div>

              {!sameAsShipping && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="billingAddress">Address</Label>
                    <Input id="billingAddress" placeholder="123 Main St" className="mt-1.5" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billingCity">City</Label>
                      <Input id="billingCity" placeholder="New York" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="billingState">State</Label>
                      <Input id="billingState" placeholder="NY" className="mt-1.5" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="billingZip">ZIP Code</Label>
                    <Input id="billingZip" placeholder="10001" className="mt-1.5" />
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-0 shadow-sm sticky top-20">
              <h2 className="font-serif text-2xl mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full mb-4">
                <Lock className="mr-2 h-4 w-4" />
                Place Order
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                <span>Secure checkout powered by Stripe</span>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <Link href="/cart" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ← Return to cart
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
