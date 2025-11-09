import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, Package, ShoppingBag, DollarSign, TrendingUp, AlertCircle } from "lucide-react"

export default function AdminDashboardPage() {
  const stats = [
    {
      label: "Total Revenue",
      value: "$124,500",
      change: "+15.3%",
      icon: DollarSign,
      trend: "up",
    },
    {
      label: "Total Orders",
      value: "1,245",
      change: "+8.2%",
      icon: ShoppingBag,
      trend: "up",
    },
    {
      label: "Active Users",
      value: "3,456",
      change: "+12.5%",
      icon: Users,
      trend: "up",
    },
    {
      label: "Products Listed",
      value: "892",
      change: "+23",
      icon: Package,
      trend: "up",
    },
  ]

  const recentOrders = [
    {
      id: "ORD-1245",
      customer: "John Doe",
      seller: "Premium Timepieces",
      amount: 299,
      status: "Completed",
      date: "2024-01-15",
    },
    {
      id: "ORD-1244",
      customer: "Sarah Miller",
      seller: "Artisan Leather Co.",
      amount: 449,
      status: "Processing",
      date: "2024-01-15",
    },
    {
      id: "ORD-1243",
      customer: "Michael Chen",
      seller: "Modern Home Studio",
      amount: 129,
      status: "Shipped",
      date: "2024-01-14",
    },
  ]

  const pendingActions = [
    {
      type: "Product Review",
      description: "5 new products awaiting approval",
      count: 5,
      link: "/admin/products/pending",
    },
    {
      type: "Seller Applications",
      description: "3 new seller applications",
      count: 3,
      link: "/admin/sellers/pending",
    },
    {
      type: "Reported Items",
      description: "2 items reported by users",
      count: 2,
      link: "/admin/reports",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-serif text-4xl md:text-5xl font-light mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your marketplace platform</p>
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

      {/* Pending Actions */}
      <Card className="p-6 border-0 shadow-sm mb-12">
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <h2 className="font-serif text-2xl">Pending Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pendingActions.map((action) => (
            <Link key={action.type} href={action.link}>
              <Card className="p-4 border border-border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{action.type}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                    {action.count}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Recent Orders */}
        <Card className="p-6 border-0 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl">Recent Orders</h2>
            <Button asChild variant="outline" size="sm" className="bg-transparent">
              <Link href="/admin/orders">View All</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between pb-4 border-b border-border last:border-0"
              >
                <div className="flex-1">
                  <p className="font-medium mb-1">{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer} • {order.seller}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium mb-1">${order.amount}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "Completed"
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

        {/* Platform Stats */}
        <Card className="p-6 border-0 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5" />
            <h2 className="font-serif text-2xl">Platform Growth</h2>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">New Users (This Month)</span>
                <span className="font-medium">+234</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-foreground h-2 rounded-full" style={{ width: "68%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">New Sellers (This Month)</span>
                <span className="font-medium">+45</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-foreground h-2 rounded-full" style={{ width: "45%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">New Products (This Month)</span>
                <span className="font-medium">+123</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-foreground h-2 rounded-full" style={{ width: "82%" }} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 border-0 shadow-sm">
        <h2 className="font-serif text-2xl mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button asChild variant="outline" size="lg" className="bg-transparent h-auto py-6">
            <Link href="/admin/users" className="flex flex-col items-center gap-2">
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-transparent h-auto py-6">
            <Link href="/admin/products" className="flex flex-col items-center gap-2">
              <Package className="h-6 w-6" />
              <span>Manage Products</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-transparent h-auto py-6">
            <Link href="/admin/orders" className="flex flex-col items-center gap-2">
              <ShoppingBag className="h-6 w-6" />
              <span>View Orders</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-transparent h-auto py-6">
            <Link href="/admin/analytics" className="flex flex-col items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              <span>Analytics</span>
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
