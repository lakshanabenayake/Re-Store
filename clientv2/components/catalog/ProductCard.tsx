'use client'

import Image from "next/image"
import Link from "next/link"
import { Product } from "@/lib/models/product"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { currencyFormat } from "@/lib/util"

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', product.id)
  }

  return (
    <Card className="group overflow-hidden border-0 shadow-none hover:shadow-lg transition-shadow duration-300">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square relative overflow-hidden bg-secondary">
          <Image
            src={product.pictureUrl || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground mb-1 uppercase">{product.type}</p>
        <h3 className="font-medium mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-lg font-semibold text-primary">
          {currencyFormat(product.price)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          onClick={handleAddToCart}
          className="flex-1"
          size="sm"
        >
          Add to Cart
        </Button>
        <Button 
          asChild
          variant="outline"
          size="sm"
        >
          <Link href={`/product/${product.id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
