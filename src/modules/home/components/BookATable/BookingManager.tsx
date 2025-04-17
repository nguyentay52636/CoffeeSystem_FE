import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoreVertical, Funnel } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: boolean;
    image: string;
}

export default function BookingManager() {
    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: 'RISTRETTO BIANCO', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee1.png' },
        { id: 2, name: 'ICED CREAMY LATTE', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee2.png' },
        { id: 3, name: 'CAPPUCINO', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee3.png' },
        { id: 4, name: 'MILK COFFEE WITH REGAL', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee4.png' },
        { id: 5, name: 'ORANGE JUICE', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee5.png' },
        { id: 6, name: 'SEAFOOD LUNCH', category: 'Food and Snack', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee6.png' },
        { id: 7, name: 'FRENCH TOAST WITH SUGAR', category: 'Food and Snack', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee1.png' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: 'Coffee and Beverage',
        price: 0,
        stock: 0,
        status: true,
        image: ''
    });

    const rowsPerPage = 10;

    // Search and filter products
    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Handlers
    const handleStatusToggle = (id: number) => {
        setProducts(
            products.map((product) =>
                product.id === id ? { ...product, status: !product.status } : product
            )
        );
    };

    const handleDelete = (id: number) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const handleEdit = (product: Product) => {
        setEditProduct({ ...product });
    };

    const handleSaveEdit = () => {
        setProducts(
            products.map((product) =>
                product.id === editProduct?.id ? editProduct : product
            )
        );
        setEditProduct(null);
    };

    const handleAddProduct = () => {
        const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
        setProducts([...products, { id: newId, ...newProduct }]);
        setNewProduct({ name: '', category: 'Coffee and Beverage', price: 0, stock: 0, status: true, image: '' });
        setIsAddOpen(false);
    };

    return (
        <div className="p-6 mx-auto bg-white shadow-md rounded-lg min-h-screen">
            {/* Header Section */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                        <nav className="text-sm text-gray-500">
                            <span>Home</span> / <span>Products</span> / <span>Product List</span>
                        </nav>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <Input
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 border-gray-300 focus:border-[#A27B5C] transition-colors"
                    />
                    <Button variant="outline" className="flex items-center border-gray-300 text-gray-600 hover:border-[#A27B5C]">
                        <Funnel className="h-4 w-4 mr-2" /> Filter
                    </Button>
                    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[#A27B5C] hover:bg-[#8c674b] text-white transition-colors">
                                + Add New Product
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Product</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        id="name"
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                        placeholder="Enter product name"
                                        className="border-gray-300 focus:border-[#A27B5C] transition-colors"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={newProduct.category}
                                        onValueChange={(value) =>
                                            setNewProduct({ ...newProduct, category: value })
                                        }
                                    >
                                        <SelectTrigger className="border-gray-300 focus:border-[#A27B5C]">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Coffee and Beverage">Coffee and Beverage</SelectItem>
                                            <SelectItem value="Food and Snack">Food and Snack</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="price">Price</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                                        placeholder="Enter price"
                                        className="border-gray-300 focus:border-[#A27B5C] transition-colors"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        value={newProduct.stock}
                                        onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                                        placeholder="Enter stock"
                                        className="border-gray-300 focus:border-[#A27B5C] transition-colors"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        checked={newProduct.status}
                                        onCheckedChange={(checked) =>
                                            setNewProduct({ ...newProduct, status: checked })
                                        }
                                        className="data-[state=checked]:bg-[#A27B5C]"
                                    />
                                    <Label>Status</Label>
                                </div>
                                <Button
                                    onClick={handleAddProduct}
                                    className="w-full bg-[#A27B5C] hover:bg-[#8c674b] text-white"
                                >
                                    Add Product
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Table Section */}
        

            {/* Pagination Section */}
            <div className="flex justify-between items-center mt-6">
                <div>
                    <span className="text-gray-600">
                        Rows per page: {rowsPerPage}
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="border-gray-300 hover:border-[#A27B5C]"
                    >
                        Previous
                    </Button>
                    <span className="text-gray-600">
                        {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="border-gray-300 hover:border-[#A27B5C]"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}