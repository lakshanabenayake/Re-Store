'use client'

import { Product } from "@/lib/models/product"
import ProductCard from "./ProductCard"

type Props = {
  products: Product[]
}

export default function ProductList({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
