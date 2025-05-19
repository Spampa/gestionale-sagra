import { OrderProvider } from '../../contexts/OrderContext';

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
    return (
        <OrderProvider>
            {children}
        </OrderProvider>
    );
}