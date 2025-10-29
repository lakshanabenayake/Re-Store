import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">RC</span>
              </div>
              <span className="font-semibold text-lg text-foreground">RetailCorp</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Leading retail corporation delivering quality products and exceptional service to customers worldwide.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Products</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/catalog" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=electronics"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=home"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=apparel"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Apparel
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
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
            <h3 className="font-semibold mb-4 text-foreground">Support</h3>
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
          <p>&copy; {new Date().getFullYear()} RetailCorp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
