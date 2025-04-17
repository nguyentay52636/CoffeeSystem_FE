import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


export default function BookingTable() {
    
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[10%] text-gray-600 uppercase">No</TableHead>
                    <TableHead className="w-[30%] text-gray-600 uppercase">Product</TableHead>
                    <TableHead className="w-[15%] text-gray-600 uppercase">Price</TableHead>
                    <TableHead className="w-[15%] text-gray-600 uppercase">Stock</TableHead>
                    <TableHead className="w-[15%] text-gray-600 uppercase">Status</TableHead>
                    <TableHead className="w-[15%] text-gray-600 uppercase">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                        <TableRow key={product.id} className="hover:bg-gray-50">
                            <TableCell className="w-[10%]">{product.id}</TableCell>
                            <TableCell className="w-[30%]">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-10 h-10 rounded-lg"
                                    />
                                    <div>
                                        <p className="font-medium uppercase">{product.name}</p>
                                        <p className="text-sm text-gray-500">{product.category}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="w-[15%]">${product.price.toFixed(2)}</TableCell>
                            <TableCell className="w-[15%]">{product.stock}</TableCell>
                            <TableCell className="w-[15%]">
                                <Switch
                                    checked={product.status}
                                    onCheckedChange={() => handleStatusToggle(product.id)}
                                    className="data-[state=checked]:bg-[#A27B5C]"
                                />
                            </TableCell>
                            <TableCell className="w-[15%]">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>Detail</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleEdit(product)}>
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>Adjust Price</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-red-600">
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500">
                            No products found
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
