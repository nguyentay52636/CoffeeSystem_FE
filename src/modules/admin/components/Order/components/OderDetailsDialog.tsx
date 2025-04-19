import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Order } from '@/lib/type';
import OrderStatusBag from './OrderStatusBag';
import { calculateTotalAmount } from '@/lib/utils';

interface OrderDetailsProps {
  selectedOrder: Order;
  open: boolean;
  onClose: () => void;
}

interface OrderInfoItemProps {
  label: string;
  value: React.ReactNode;
}

const OrderInfoItem = ({ label, value }: OrderInfoItemProps) => (
  <div>
    <p className='text-sm text-muted-foreground'>{label}</p>
    <div className='font-medium'>{value}</div>
  </div>
);

const OrderProductItem = ({ item }: { item: Order['order_items'][0] }) => (
  <div className='flex items-center border rounded-lg p-4'>
    <img
      src='https://via.placeholder.com/80'
      alt={item.product.name}
      className='w-20 h-20 object-cover rounded mr-4'
    />
    <div className='flex-1'>
      <p className='font-medium'>{item.product.name}</p>
      <p className='text-sm text-muted-foreground'>{item.product.description}</p>
      <p className='text-sm'>
        {item.quantity} x ${item.price.toFixed(2)}
      </p>
    </div>
    <p className='font-medium'>${(item.quantity * item.price).toFixed(2)}</p>
  </div>
);

const CustomerDetails = ({ user, total }: { user: Order['user']; total: number }) => (
  <div className='space-y-4 bg-muted/50 p-4 rounded-lg'>
    <h3 className='text-lg font-semibold'>Customer Detail</h3>
    <OrderInfoItem label='Name' value={user.full_name} />
    <OrderInfoItem
      label='Account'
      value={`${user.full_name.toLowerCase().replace(' ', '.')}@mail.com`}
    />
    <OrderInfoItem label='Address' value={user.address} />
    <div className='border-t pt-4'>
      <p className='text-sm text-muted-foreground'>Total</p>
      <p className='text-xl font-semibold'>${total.toFixed(2)}</p>
    </div>
    <div>
      <Button variant='default' className='w-full'>
        Process Order
      </Button>
    </div>
  </div>
);

export default function OrderDetailsDialog({ selectedOrder, onClose, open }: OrderDetailsProps) {
  const total = calculateTotalAmount(selectedOrder.order_items);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='max-w-4xl p-6'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>Order Details</DialogTitle>
        </DialogHeader>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='md:col-span-2 space-y-6'>
            <div className='space-y-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <OrderInfoItem
                  label='Status'
                  value={<OrderStatusBag status={selectedOrder.status} />}
                />
                <OrderInfoItem
                  label='Transaction Date'
                  value={new Date(selectedOrder.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                />
                <OrderInfoItem label='Payment Method' value='Credit or Debit Card' />
                <OrderInfoItem label='Ship Method' value='Free Shipping (7-10 Days)' />
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-4'>Your Order</h3>
              <div className='space-y-4'>
                {selectedOrder.order_items.map((item) => (
                  <OrderProductItem key={`${item.order_id}-${item.product_id}`} item={item} />
                ))}
              </div>
            </div>
          </div>

          <CustomerDetails user={selectedOrder.user} total={total} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
