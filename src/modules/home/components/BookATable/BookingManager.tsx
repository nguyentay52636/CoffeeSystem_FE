import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Trash2 } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    variantPrice: string;
    status: boolean;
}

export default function BookingManager() {
    const [categories, setCategories] = useState<Category[]>([
        { id: 1, name: 'Coffee & Beverage', variantPrice: 'Additional Price', status: true },
        { id: 2, name: 'Food & Snack', variantPrice: 'Additional Price', status: false },
        { id: 3, name: 'imaj @HOME', variantPrice: 'Specific Price', status: true },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', variantPrice: 'Additional Price', status: true });

    const rowsPerPage = 10;

    // Search and filter categories
    const filteredCategories = useMemo(() => {
        return categories.filter((category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [categories, searchTerm]);

    const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);
    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Handlers
    const handleStatusToggle = (id: number) => {
        setCategories(
            categories.map((category) =>
                category.id === id ? { ...category, status: !category.status } : category
            )
        );
    };

    const handleDelete = (id: number) => {
        setCategories(categories.filter((category) => category.id !== id));
    };

    const handleEdit = (category: Category) => {
        setEditCategory({ ...category });
    };

    const handleSaveEdit = () => {
        setCategories(
            categories.map((category) =>
                category.id === editCategory?.id ? editCategory : category
            )
        );
        setEditCategory(null);
    };

    const handleAddCategory = () => {
        const newId = categories.length ? Math.max(...categories.map((c) => c.id)) + 1 : 1;
        setCategories([...categories, { id: newId, ...newCategory }]);
        setNewCategory({ name: '', variantPrice: 'Additional Price', status: true });
        setIsAddOpen(false);
    };

    return (
        <div className="p-6  mx-auto bg-white shadow-md rounded-lg min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Booking Manager - Product Categories</h1>
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#A27B5C] hover:bg-orange-300 cursor-pointer text-white transition-colors">
                            + New Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Category</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Category Name</Label>
                                <Input
                                    id="name"
                                    value={newCategory.name}
                                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                    placeholder="Enter category name"
                                    className="border-gray-300 focus:border-orange-500 transition-colors"
                                />
                            </div>
                            <div>
                                <Label htmlFor="variantPrice">Variant Price</Label>
                                <Select
                                    value={newCategory.variantPrice}
                                    onValueChange={(value) =>
                                        setNewCategory({ ...newCategory, variantPrice: value })
                                    }
                                >
                                    <SelectTrigger className="border-gray-300 focus:border-orange-500">
                                        <SelectValue placeholder="Select variant price" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Additional Price">Additional Price</SelectItem>
                                        <SelectItem value="Specific Price">Specific Price</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    checked={newCategory.status}
                                    onCheckedChange={(checked) =>
                                        setNewCategory({ ...newCategory, status: checked })
                                    }
                                    className="data-[state=checked]:bg-[#A27B5C]"
                                />
                                <Label>Status</Label>
                            </div>
                            <Button
                                onClick={handleAddCategory}
                                className="w-full bg-bg-secondary! hover:bg-orange-300 text-white"
                            >
                                Add Category
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Search Section */}
            <div className="mb-6">
                <Input
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm border-gray-300 focus:border-orange-500 transition-colors"
                />
            </div>

            {/* Table Section */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-gray-600">No</TableHead>
                        <TableHead className="text-gray-600">Name</TableHead>
                        <TableHead className="text-gray-600">Variant Price</TableHead>
                        <TableHead className="text-gray-600">Status</TableHead>
                        <TableHead className="text-gray-600">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedCategories.length > 0 ? (
                        paginatedCategories.map((category) => (
                            <TableRow key={category.id} className="hover:bg-gray-50">
                                <TableCell>{category.id}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.variantPrice}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={category.status}
                                        onCheckedChange={() => handleStatusToggle(category.id)}
                                        className="data-[state=checked]:bg-[#A27B5C]"
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(category)}
                                                    className="border-gray-300 hover:border-orange-500"
                                                >
                                                    <Pencil className="h-4 w-4 mr-1" /> Edit
                                                </Button>
                                            </DialogTrigger>
                                            {editCategory && (
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Category</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <Label htmlFor="editName">Category Name</Label>
                                                            <Input
                                                                id="editName"
                                                                value={editCategory.name}
                                                                onChange={(e) =>
                                                                    setEditCategory({ ...editCategory, name: e.target.value })
                                                                }
                                                                className="border-gray-300 focus:border-orange-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="editVariantPrice">Variant Price</Label>
                                                            <Select
                                                                value={editCategory.variantPrice}
                                                                onValueChange={(value) =>
                                                                    setEditCategory({ ...editCategory, variantPrice: value })
                                                                }
                                                            >
                                                                <SelectTrigger className="border-gray-300 focus:border-orange-500">
                                                                    <SelectValue placeholder="Select variant price" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Additional Price">Additional Price</SelectItem>
                                                                    <SelectItem value="Specific Price">Specific Price</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Switch
                                                                checked={editCategory.status}
                                                                onCheckedChange={(checked) =>
                                                                    setEditCategory({ ...editCategory, status: checked })
                                                                }
                                                                className="data-[state=checked]:bg-[#A27B5C]"
                                                            />
                                                            <Label>Status</Label>
                                                        </div>
                                                        <Button
                                                            onClick={handleSaveEdit}
                                                            className="w-full bg-bg-seconary hover:bg-orange-600 text-white"
                                                        >
                                                            Save Changes
                                                        </Button>
                                                    </div>
                                                </DialogContent>
                                            )}
                                        </Dialog>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(category.id)}
                                            className=" cursor-pointer bg-red-800 hover:bg-red-600 text-white"
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-gray-500">
                                No categories found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

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
                        className="border-gray-300 hover:border-orange-500"
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
                        className="border-gray-300 hover:border-orange-500"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}