"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Ban, CheckCircle } from "lucide-react"

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Buyer",
      status: "Active",
      joined: "2024-01-10",
      orders: 12,
    },
    {
      id: 2,
      name: "Sarah Miller",
      email: "sarah@example.com",
      role: "Seller",
      status: "Active",
      joined: "2024-01-08",
      orders: 45,
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael@example.com",
      role: "Buyer",
      status: "Active",
      joined: "2024-01-05",
      orders: 8,
    },
    {
      id: 4,
      name: "Emma Williams",
      email: "emma@example.com",
      role: "Seller",
      status: "Suspended",
      joined: "2023-12-20",
      orders: 23,
    },
    {
      id: 5,
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "Buyer",
      status: "Active",
      joined: "2023-12-15",
      orders: 34,
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()
    return matchesSearch && matchesRole
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-serif text-4xl md:text-5xl font-light mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage platform users and their accounts</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="buyer">Buyers</SelectItem>
            <SelectItem value="seller">Sellers</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left p-4 font-medium">User</th>
                <th className="text-left p-4 font-medium">Role</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Joined</th>
                <th className="text-left p-4 font-medium">Orders</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-border">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary" className="bg-secondary">
                      {user.role}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant="secondary"
                      className={
                        user.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                      }
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted-foreground">{user.joined}</td>
                  <td className="p-4 text-muted-foreground">{user.orders}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/admin/users/${user.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      {user.status === "Active" ? (
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Ban className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-600">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No users found matching your filters.</p>
        </div>
      )}
    </div>
  )
}
