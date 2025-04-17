import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Interfaces based on the database schema
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface OrderItem {
  order_id: number;
  product_id: number;
  quantity: number;
  price: number; // Price at the time of order
  product: Product; // Joined product data
}

interface User {
  id: number;
  full_name: string;
  address: string;
}

interface Order {
  id: number;
  user_id: number;
  status: 'New Order' | 'Processed' | 'Canceled';
  created_at: string;
  user: User;
  order_items: OrderItem[];
}

export default function OrderManager() {
  // Sample data (in a real app, this would come from an API)
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1001,
      user_id: 1,
      status: 'New Order',
      created_at: '2023-04-29',
      user: { id: 1, full_name: 'Devon Lane', address: '3517 W. Gray St. Utica, Pennsylvania 57867' },
      order_items: [
        {
          order_id: 1001,
          product_id: 1,
          quantity: 1,
          price: 293,
          product: { id: 1, name: 'RISTRETTO BIANCO', description: 'A strong coffee', price: 293 },
        },
      ],
    },
    {
      id: 1002,
      user_id: 2,
      status: 'New Order',
      created_at: '2023-04-29',
      user: { id: 2, full_name: 'Arlene McCoy', address: '2972 Westheimer Rd. Santa Ana, Illinois 85486' },
      order_items: [
        {
          order_id: 1002,
          product_id: 1,
          quantity: 2,
          price: 293,
          product: { id: 1, name: 'RISTRETTO BIANCO', description: 'A strong coffee', price: 293 },
        },
        {
          order_id: 1002,
          product_id: 2,
          quantity: 3,
          price: 188,
          product: { id: 2, name: 'ICED CREAMY LATTE', description: 'A refreshing latte', price: 188 },
        },
      ],
    },
    {
      id: 1003,
      user_id: 3,
      status: 'New Order',
      created_at: '2023-04-29',
      user: { id: 3, full_name: 'Leslie Alexander', address: '2715 Ash Dr. San Jose, South Dakota 83475' },
      order_items: [
        {
          order_id: 1003,
          product_id: 1,
          quantity: 2,
          price: 293,
          product: { id: 1, name: 'RISTRETTO BIANCO', description: 'A strong coffee', price: 293 },
        },
        {
          order_id: 1003,
          product_id: 3,
          quantity: 2,
          price: 100,
          product: { id: 3, name: 'CAPPUCINO', description: 'A classic cappuccino', price: 100 },
        },
      ],
    },
    {
      id: 1004,
      user_id: 4,
      status: 'Processed',
      created_at: '2023-04-29',
      user: { id: 4, full_name: 'Savannah Nguyen', address: '3517 W. Gray St. Utica, Pennsylvania 57867' },
      order_items: [
        {
          order_id: 1004,
          product_id: 1,
          quantity: 1,
          price: 293,
          product: { id: 1, name: 'RISTRETTO BIANCO', description: 'A strong coffee', price: 293 },
        },
        {
          order_id: 1004,
          product_id: 2,
          quantity: 2,
          price: 188,
          product: { id: 2, name: 'ICED CREAMY LATTE', description: 'A refreshing latte', price: 188 },
        },
      ],
    },
    {
      id: 1005,
      user_id: 5,
      status: 'Processed',
      created_at: '2023-04-29',
      user: { id: 5, full_name: 'Courtney Henry', address: '4140 Parker Rd. Allentown, New Mexico 31134' },
      order_items: [
        {
          order_id: 1005,
          product_id: 1,
          quantity: 1,
          price: 293,
          product: { id: 1, name: 'RISTRETTO BIANCO', description: 'A strong coffee', price: 293 },
        },
        {
          order_id: 1005,
          product_id: 3,
          quantity: 2,
          price: 100,
          product: { id: 3, name: 'CAPPUCINO', description: 'A classic cappuccino', price: 100 },
        },
      ],
    },
    {
      id: 1006,
      user_id: 6,
      status: 'Canceled',
      created_at: '2023-04-29',
      user: { id: 6, full_name: 'Darrell Steward', address: '1901 Thornridge Cir.' },
      order_items: [
        {
          order_id: 1006,
          product_id: 1,
          quantity: 1,
          price: 293,
          product: { id: 1, name: 'RISTRETTO BIANCO', description: 'A strong coffee', price: 293 },
        },
        {
          order_id: 1006,
          product_id: 2,
          quantity: 1,
          price: 489,
          product: { id: 2, name: 'ICED CREAMY LATTE', description: 'A refreshing latte', price: 489 },
        },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const rowsPerPage = 5;

  // Calculate total amount for an order
  const calculateTotalAmount = (orderItems: OrderItem[]) => {
    return orderItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  // Search and filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm);
      const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handlers
  const handleDelete = (id: number) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="p-6 mx-auto bg-white shadow-md rounded-lg min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
            <nav className="text-sm text-gray-500">
              <span>Home</span> / <span>Orders</span>
            </nav>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border-gray-300 focus:border-blue-500 transition-colors"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] border-gray-300 focus:border-blue-500">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">ALL</SelectItem>
              <SelectItem value="New Order">New Order</SelectItem>
              <SelectItem value="Processed">Processed</SelectItem>
              <SelectItem value="Canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="text"
            placeholder="10 Apr - 20 Apr"
            className="w-[180px] border-gray-300 focus:border-blue-500 transition-colors"
            disabled
          />
          <Button
            variant="outline"
            className="flex items-center border-gray-300 text-gray-600 hover:border-blue-500"
          >
            Export
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div>#00{order.id}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <div>{order.user.full_name}</div>
                  <div className="text-sm text-gray-500">{order.user.address}</div>
                </TableCell>
                <TableCell>{order.order_items.length}</TableCell>
                <TableCell>${calculateTotalAmount(order.order_items)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      order.status === 'New Order'
                        ? 'bg-gray-200 text-gray-800'
                        : order.status === 'Processed'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(order.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details - #00{selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              {/* Order Summary */}
              <div className="border-b pb-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">{selectedOrder.user.full_name}</p>
                    <p className="text-sm text-gray-500">{selectedOrder.user.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-medium">
                      {new Date(selectedOrder.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      selectedOrder.status === 'New Order'
                        ? 'bg-gray-200 text-gray-800'
                        : selectedOrder.status === 'Processed'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              {/* Product List */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Products</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.order_items.map((item) => (
                      <TableRow key={`${item.order_id}-${item.product_id}`}>
                        <TableCell>{item.product.name}</TableCell>
                        <TableCell>{item.product.description}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell>${item.quantity * item.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 text-right">
                  <p className="font-semibold">
                    Total Amount: ${calculateTotalAmount(selectedOrder.order_items)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-6">
        <div>
          <span className="text-gray-600">Rows per page: {rowsPerPage}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="border-gray-300 hover:border-blue-500"
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
            className="border-gray-300 hover:border-blue-500"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}