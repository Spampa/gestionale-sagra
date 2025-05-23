'use client';

import { FoodsOrderd } from "@/types/foodOrdered";
import { createContext, ReactNode, useContext, useState } from "react";

type Order = {
    table: number
    customer: string
    price: number

    foodsOrdered: Array<FoodsOrderd>
}

type OrderContextType = {
    order: Order;
    setOrder: React.Dispatch<React.SetStateAction<Order>>;
};

const initialOrder: Order = {
    table: 0,
    customer: '',
    price: 0,
    foodsOrdered: [],
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