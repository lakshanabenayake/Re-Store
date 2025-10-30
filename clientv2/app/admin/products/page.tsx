"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFetchProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } from "@/lib/api/catalogApi"
import { toast } from "sonner"

interface ProductForm {
  name: string
  description: string
  price: number
  file: File | null
  brand: string
  type: string
  quantityInStock: number
}

export default function AdminProductsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingProductId, setEditingProductId] = useState<number | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    description: "",
    price: 0,
    file: null,
    brand: "",
    type: "",
    quantityInStock: 0,
  })

  // Fetch all products with maximum page size for admin panel
  const { data: productsResponse, isLoading, refetch } = useFetchProductsQuery({ 
    pageSize: 50,
    pageNumber: pageNumber 
  })
  console.log("Products fetched:", productsResponse);
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation()
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()
  const [deleteProduct] = useDeleteProductMutation()

  const products = productsResponse?.items || []
  const metadata = productsResponse?.metadata

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      file: null,
      brand: "",
      type: "",
      quantityInStock: 0,
    })
    setPreviewUrl(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, file })
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreateProduct = async () => {
    try {
      if (!formData.file) {
        toast.error("Please select an image")
        return
      }

      const form = new FormData()
      form.append('name', formData.name)
      form.append('description', formData.description)
      form.append('price', (formData.price * 100).toString()) // Convert to cents
      form.append('type', formData.type)
      form.append('brand', formData.brand)
      form.append('quantityInStock', formData.quantityInStock.toString())
      form.append('file', formData.file)

      await createProduct(form as any).unwrap()
      toast.success("Product created successfully!")
      setIsCreateDialogOpen(false)
      resetForm()
      // Reset to page 1 to see the new product
      setPageNumber(1)
      // Explicitly refetch to ensure UI updates
      refetch()
    } catch (error: any) {
      toast.error(error?.data?.title || "Failed to create product")
    }
  }

  const handleEditProduct = (product: any) => {
    setEditingProductId(product.id)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price / 100, // Convert from cents
      file: null,
      brand: product.brand,
      type: product.type,
      quantityInStock: product.quantityInStock,
    })
    setPreviewUrl(product.pictureUrl) // Show existing image
    setIsEditDialogOpen(true)
  }

  const handleUpdateProduct = async () => {
    if (!editingProductId) return
    
    try {
      const form = new FormData()
      form.append('id', editingProductId.toString())
      form.append('name', formData.name)
      form.append('description', formData.description)
      form.append('price', (formData.price * 100).toString()) // Convert to cents
      form.append('type', formData.type)
      form.append('brand', formData.brand)
      form.append('quantityInStock', formData.quantityInStock.toString())
      
      // Only append file if a new one is selected
      if (formData.file) {
        form.append('file', formData.file)
      }

      await updateProduct(form as any).unwrap()
      toast.success("Product updated successfully!")
      setIsEditDialogOpen(false)
      setEditingProductId(null)
      resetForm()
      // Explicitly refetch to ensure UI updates
      refetch()
    } catch (error: any) {
      toast.error(error?.data?.title || "Failed to update product")
    }
  }

  const handleDeleteProduct = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return
    
    try {
      await deleteProduct(id).unwrap()
      toast.success("Product deleted successfully!")
      // Explicitly refetch to ensure UI updates
      refetch()
    } catch (error: any) {
      toast.error(error?.data?.title || "Failed to delete product")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-muted-foreground mt-1">Manage your product inventory</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Product</DialogTitle>
              <DialogDescription>
                Add a new product to your inventory
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter product description"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantity in Stock</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantityInStock}
                    onChange={(e) => setFormData({ ...formData, quantityInStock: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Enter brand name"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="type">Category</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Boards">Boards</SelectItem>
                      <SelectItem value="Boots">Boots</SelectItem>
                      <SelectItem value="Hats">Hats</SelectItem>
                      <SelectItem value="Gloves">Gloves</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="image">Product Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {previewUrl && (
                  <div className="mt-2">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProduct} disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Product"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Products</p>
              <h3 className="text-2xl font-bold">{products.length}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Package className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Stock</p>
              <h3 className="text-2xl font-bold">
                {products.filter((p: any) => p.quantityInStock > 0).length}
              </h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/10 rounded-lg">
              <Package className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Out of Stock</p>
              <h3 className="text-2xl font-bold">
                {products.filter((p: any) => p.quantityInStock === 0).length}
              </h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Product Inventory</h2>
          
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No products found. Create your first product!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product: any) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.pictureUrl}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>{product.type}</TableCell>
                      <TableCell>${(product.price / 100).toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={product.quantityInStock > 0 ? "text-green-600" : "text-red-600"}>
                          {product.quantityInStock}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Pagination Controls */}
          {metadata && metadata.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {products.length} of {metadata.totalCount} products
                {metadata.totalPages > 1 && ` (Page ${metadata.currentPage} of ${metadata.totalPages})`}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                  disabled={pageNumber === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: metadata.totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      // Show first page, last page, current page, and pages around current
                      return page === 1 || 
                             page === metadata.totalPages || 
                             Math.abs(page - pageNumber) <= 1
                    })
                    .map((page, index, array) => (
                      <div key={page} className="flex items-center">
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-2 text-muted-foreground">...</span>
                        )}
                        <Button
                          variant={pageNumber === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPageNumber(page)}
                        >
                          {page}
                        </Button>
                      </div>
                    ))
                  }
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPageNumber(prev => Math.min(metadata.totalPages, prev + 1))}
                  disabled={pageNumber === metadata.totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update product information
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Product Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter product description"
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price ($)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-quantity">Quantity in Stock</Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  value={formData.quantityInStock}
                  onChange={(e) => setFormData({ ...formData, quantityInStock: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-brand">Brand</Label>
                <Input
                  id="edit-brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="Enter brand name"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-type">Category</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Boards">Boards</SelectItem>
                    <SelectItem value="Boots">Boots</SelectItem>
                    <SelectItem value="Hats">Hats</SelectItem>
                    <SelectItem value="Gloves">Gloves</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-image">Product Image</Label>
              <Input
                id="edit-image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {previewUrl && (
                <div className="mt-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded border"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.file ? "New image selected" : "Current image"}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false)
              setEditingProductId(null)
              resetForm()
            }}>
              Cancel
            </Button>
            <Button onClick={handleUpdateProduct} disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
