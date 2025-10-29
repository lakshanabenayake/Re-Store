"use client"

import Link from "next/link"
import { Search, ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useFetchBasketQuery } from "@/lib/api/basketApi"

export function Navbar() {

  const {data: basket} = useFetchBasketQuery();
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-xl font-serif font-semibold tracking-tight">LUXE</div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/catalog" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            Shop
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            About
          </Link>
          <Link href="/seller" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            Sell
          </Link>
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="pl-10 bg-secondary border-0" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5 md:hidden" />
          </Button>

          <Link href="/login">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-6 mt-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search products..." className="pl-10" />
                </div>
                <Link href="/catalog" className="text-lg font-medium">
                  Shop
                </Link>
                <Link href="/about" className="text-lg font-medium">
                  About
                </Link>
                <Link href="/seller" className="text-lg font-medium">
                  Sell
                </Link>
                <Link href="/admin" className="text-lg font-medium">
                  Admin
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
