'use client';

import { createContext, ReactNode, useContext, useState } from "react";

type Order = {
    table: number
    customer: string
    price: number

    foodOrdered: Array<FoodOrdered>
}

type FoodOrdered = {
    quantity: number
    foodId: number
}

type OrderContextType = {
    order: Order;
    setOrder: React.Dispatch<React.SetStateAction<Order>>;
};

const initialOrder: Order = {
    table: 0,
    customer: '',
    price: 0,
    foodOrdered: [],
};

const OrderContext = createContext<OrderContextType>({
    order: initialOrder,
    setOrder: () => { },
});

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [order, setOrder] = useState<Order>(initialOrder);
    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export function useOrder() {
    return useContext(OrderContext);
}