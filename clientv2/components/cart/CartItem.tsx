'use client'

import Image from "next/image"
import Link from "next/link"
import { Item } from "@/lib/models/basket"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useAddBasketItemMutation, useRemoveBasketItemMutation } from "@/lib/api/basketApi"
import { currencyFormat } from "@/lib/util"

type Props = {
  item: Item
}

export default function CartItem({ item }: Props) {
  const [removeBasketItem, { isLoading: isRemoving }] = useRemoveBasketItemMutation();
  const [addBasketItem, { isLoading: isAdding }] = useAddBasketItemMutation();

  const handleDecrease = () => {
    removeBasketItem({ productId: item.productId, quantity: 1 });
  };

  const handleIncrease = () => {
    addBasketItem({ product: item, quantity: 1 });
  };

  const handleRemove = () => {
    removeBasketItem({ productId: item.productId, quantity: item.quantity });
  };

  return (
    <Card className="p-6 border-0 shadow-sm">
      <div className="flex gap-6">
        <div className="w-24 h-24 relative shrink-0 rounded-lg overflow-hidden bg-secondary">
          <Image 
            src={item.pictureUrl || "/placeholder.svg"} 
            alt={item.name} 
            fill 
            className="object-cover" 
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <Link href={`/product/${item.productId}`}>
                <h3 className="font-medium hover:text-muted-foreground transition-colors">
                  {item.name}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground">{item.brand}</p>
              <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              disabled={isRemoving}
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
                onClick={handleDecrease}
                disabled={item.quantity <= 1 || isRemoving || isAdding}
                className="h-8 w-8"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-12 text-center text-sm">{item.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleIncrease}
                disabled={isRemoving || isAdding}
                className="h-8 w-8"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                {currencyFormat(item.price)} × {item.quantity}
              </p>
              <p className="font-medium">{currencyFormat(item.price * item.quantity)}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
