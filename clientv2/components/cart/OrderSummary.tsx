'use client'

import { useState } from "react"
import Link from "next/link"
import { useFetchBasketQuery } from "@/lib/api/basketApi"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { currencyFormat } from "@/lib/util"
import { Item } from "@/lib/models/basket"

export default function OrderSummary() {
  const { data: basket } = useFetchBasketQuery();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = basket?.items.reduce((sum: number, item: Item) => sum + item.quantity * item.price, 0) ?? 0;
  const deliveryFee = subtotal > 10000 ? 0 : 500; // Free delivery over $100
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount + deliveryFee;

  const applyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(0.1);
    } else {
      setDiscount(0);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 border-0 shadow-sm">
        <h2 className="font-serif text-2xl mb-2">Order Summary</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Orders over {currencyFormat(10000)} qualify for free delivery!
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{currencyFormat(subtotal)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount ({(discount * 100).toFixed(0)}%)</span>
              <span>-{currencyFormat(discountAmount)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery fee</span>
            <span>{deliveryFee === 0 ? "Free" : currencyFormat(deliveryFee)}</span>
          </div>

          {subtotal < 10000 && deliveryFee > 0 && (
            <p className="text-xs text-muted-foreground">
              Add {currencyFormat(10000 - subtotal)} more for free delivery
            </p>
          )}

          <div className="border-t border-border pt-4">
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>{currencyFormat(total)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Button asChild size="lg" className="w-full">
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
            <Link href="/catalog">Continue Shopping</Link>
          </Button>
        </div>
      </Card>

      {/* Promo Code */}
      <Card className="p-6 border-0 shadow-sm">
        <form onSubmit={applyPromoCode}>
          <h3 className="font-medium mb-4">Do you have a voucher code?</h3>
          <div className="space-y-3">
            <Input
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Apply Code
            </Button>
            {discount > 0 && (
              <p className="text-xs text-green-600 text-center">
                Promo code applied successfully!
              </p>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}
