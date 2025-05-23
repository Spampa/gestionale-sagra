import { Request, Response } from "express";
import { FoodsOrdered, Order } from "@generated/prisma";
import generateOrderId from "@/lib/idGenerator";

import prisma from "@/utils/prisma";

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    const orders = await prisma.order.findMany({
        include: {
            foodsOrdered: true
        }
    });
    res.status(200).json(orders);
}

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    const order = await prisma.order.findUnique({
        where: {
            id
        },
        include: {
            foodsOrdered: {
                omit: {
                    orderId: true,
                    foodId: true
                },
                include: {
                    food: {
                        omit: {
                            categoryId: true
                        },
                        include: {
                            category: true
                        }
                    }
                }
            }
        },
        
    });

    if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
    }

    res.status(200).json(order);
}

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    const order: Order = req.body;
    const foodsOrdereds: Array<FoodsOrdered> = req.body.foodsOrdered;

    try {
        const newOrder = await prisma.order.create({
            data: {
                id: await generateOrderId(),
                table: order.table,
                customer: order.customer
            }
        });

        await prisma.foodsOrdered.createMany({
            data: foodsOrdereds.map(foodsOrdered => ({ quantity: foodsOrdered.quantity, foodId: foodsOrdered.foodId, orderId: newOrder.id }))
        })

        const fullOrder = await prisma.order.findFirst({
            where: {
                id: newOrder.id
            },
            include: {
                foodsOrdered: {
                    include: {
                        food: true
                    }
                }
            }
        })

        res.status(201).json(fullOrder);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    try {
        await prisma.order.delete({
            where: {
                id
            }
        });

        res.status(200).json({
            message: "Order deleted"
        });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}