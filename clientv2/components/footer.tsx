import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">RC</span>
              </div>
              <span className="font-semibold text-lg">RetailCorp</span>
            </div>
            <p className="text-sm text-background/80 leading-relaxed">
              Leading retail corporation delivering quality products and exceptional service to customers worldwide.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/catalog" className="text-background/80 hover:text-background transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=electronics"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=home"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=apparel"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Apparel
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-background/80 hover:text-background transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/seller" className="text-background/80 hover:text-background transition-colors">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-background/80 hover:text-background transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-background/80 hover:text-background transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/help" className="text-background/80 hover:text-background transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-background/80 hover:text-background transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-background/80 hover:text-background transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-background/80 hover:text-background transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center text-sm text-background/80">
          <p>&copy; {new Date().getFullYear()} RetailCorp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
