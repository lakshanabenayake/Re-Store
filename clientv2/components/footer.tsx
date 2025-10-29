import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="text-xl font-serif font-semibold tracking-tight mb-4">LUXE</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Curated excellence meets timeless design. Discover premium products for the modern lifestyle.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-medium mb-4">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/catalog" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=fashion"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Fashion
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=home"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home & Living
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=accessories"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/seller" className="text-muted-foreground hover:text-foreground transition-colors">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-medium mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LUXE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
