'use client'

import { OrderProvider } from '../../contexts/OrderContext';

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
    return (
        <OrderProvider>
            <main className='bg-secondary'>
                {children}
            </main>
        </OrderProvider>
    );
}