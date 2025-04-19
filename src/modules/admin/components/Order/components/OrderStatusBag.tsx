import { Badge } from '@/components/ui/badge';
import { Order } from '@/lib/type';

export default function OrderStatusBag({ status }: { status: Order['status'] }) {
  return (
    <Badge
      variant={
        status === 'New Order' ? 'default' : status === 'Processed' ? 'secondary' : 'destructive'
      }
    >
      {status}
    </Badge>
  );
}
