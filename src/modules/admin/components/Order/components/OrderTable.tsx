import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Order } from '@/lib/type';
import { Button } from '@/components/ui/button';
import { Eye, MoreVertical, Trash2 } from 'lucide-react';
import OderDetailsDialog from './OderDetailsDialog';
import OrderStatusBag from './OrderStatusBag';
import { useState } from 'react';
import { calculateTotalAmount } from '@/lib/utils';

interface OrderTableProps {
  oders: Order[];
}

const OrderItemDropdownMenu = ({ order }: { order: Order }) => {
  const [openDetailDialog, setOpenDetailDialog] = useState(false);

  const handleOpenDetailDialog = () => {
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='h-8 w-8 p-0 hover:bg-slate-100'>
            <MoreVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem onClick={handleOpenDetailDialog}>
            <Eye className='mr-2 h-4 w-4' />
            Xem chi tiết đơn hàng
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => console.log(`Deleting order ${order.id}`)}
            className='text-red-600'
          >
            <Trash2 className='mr-2 h-4 w-4' />
            <span>Xoá yêu cầu</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <OderDetailsDialog
        onClose={handleCloseDetailDialog}
        open={openDetailDialog}
        selectedOrder={order}
      />
    </>
  );
};

const OrderTableRow = ({ order }: { order: Order }) => (
  <TableRow key={order.id}>
    <TableCell>
      <Checkbox />
    </TableCell>
    <TableCell>
      <div>#00{order.id}</div>
      <div className='text-sm text-muted-foreground'>
        {new Date(order.created_at).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </div>
    </TableCell>
    <TableCell>
      <div>{order.user.full_name}</div>
      <div className='text-sm text-muted-foreground'>{order.user.address}</div>
    </TableCell>
    <TableCell>{order.order_items.length}</TableCell>
    <TableCell>${calculateTotalAmount(order.order_items)}</TableCell>
    <TableCell>
      <OrderStatusBag status={order.status} />
    </TableCell>
    <TableCell>
      <OrderItemDropdownMenu order={order} />
    </TableCell>
  </TableRow>
);

export default function OrderTable({ oders }: OrderTableProps) {
  return (
    <div className='border rounded-lg overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[50px]'>
              <Checkbox />
            </TableHead>
            <TableHead>Mã hoá đơn</TableHead>
            <TableHead>Khách hàng</TableHead>
            <TableHead>Sản phẩm</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className='w-[50px]'>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {oders.map((order) => (
            <OrderTableRow key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
