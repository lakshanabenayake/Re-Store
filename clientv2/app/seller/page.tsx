import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Package, TrendingUp, DollarSign, ShoppingBag, Plus } from "lucide-react"

export default function SellerDashboardPage() {
  const stats = [
    {
      label: "Total Revenue",
      value: "$12,450",
      change: "+12.5%",
      icon: DollarSign,
    },
    {
      label: "Products Listed",
      value: "24",
      change: "+3",
      icon: Package,
    },
    {
      label: "Orders",
      value: "156",
      change: "+8.2%",
      icon: ShoppingBag,
    },
    {
      label: "Conversion Rate",
      value: "3.2%",
      change: "+0.5%",
      icon: TrendingUp,
    },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      product: "Minimalist Watch",
      customer: "John Doe",
      amount: 299,
      status: "Shipped",
      date: "2024-01-15",
    },
    {
      id: "ORD-002",
      product: "Leather Bag",
      customer: "Sarah Miller",
      amount: 449,
      status: "Processing",
      date: "2024-01-14",
    },
    {
      id: "ORD-003",
      product: "Ceramic Vase",
      customer: "Michael Chen",
      amount: 129,
      status: "Delivered",
      date: "2024-01-13",
    },
  ]

  const products = [
    {
      id: 1,
      name: "Minimalist Watch",
      price: 299,
      stock: 12,
      sales: 45,
      status: "Active",
    },
    {
      id: 2,
      name: "Leather Bag",
      price: 449,
      stock: 8,
      sales: 32,
      status: "Active",
    },
    {
      id: 3,
      name: "Ceramic Vase",
      price: 129,
      stock: 0,
      sales: 67,
      status: "Out of Stock",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl font-light mb-2">Seller Dashboard</h1>
          <p className="text-muted-foreground">Manage your products and track your sales</p>
        </div>
        <Button asChild size="lg">
          <Link href="/seller/products/new">
            <Plus className="mr-2 h-5 w-5" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-sm text-green-600">{stat.change}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-2xl font-light">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Recent Orders */}
        <Card className="p-6 border-0 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl">Recent Orders</h2>
            <Button asChild variant="outline" size="sm" className="bg-transparent">
              <Link href="/seller/orders">View All</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between pb-4 border-b border-border last:border-0"
              >
                <div className="flex-1">
                  <p className="font-medium mb-1">{order.product}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer} • {order.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium mb-1">${order.amount}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Products */}
        <Card className="p-6 border-0 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl">Your Products</h2>
            <Button asChild variant="outline" size="sm" className="bg-transparent">
              <Link href="/seller/products">Manage</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between pb-4 border-b border-border last:border-0"
              >
                <div className="flex-1">
                  <p className="font-medium mb-1">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Stock: {product.stock} • Sales: {product.sales}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium mb-1">${product.price}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      product.status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 border-0 shadow-sm">
        <h2 className="font-serif text-2xl mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button asChild variant="outline" size="lg" className="bg-transparent h-auto py-6">
            <Link href="/seller/products/new" className="flex flex-col items-center gap-2">
              <Plus className="h-6 w-6" />
              <span>Add New Product</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-transparent h-auto py-6">
            <Link href="/seller/orders" className="flex flex-col items-center gap-2">
              <ShoppingBag className="h-6 w-6" />
              <span>View Orders</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-transparent h-auto py-6">
            <Link href="/seller/analytics" className="flex flex-col items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              <span>View Analytics</span>
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
