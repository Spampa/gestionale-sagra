import { Request, Response } from "express";
import { FoodOrdered, Order } from "@generated/prisma";

import prisma from "@/utils/prisma";

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    const orders = await prisma.order.findMany();
    res.status(200).json(orders);
}

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    const order = await prisma.order.findUnique({
        where: {
            id
        }
    });

    if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
    }

    res.status(200).json(order);
}

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    const order: Order = req.body;
    const foodOrdereds: Array<FoodOrdered> = req.body.foodOrdered;

    try {
        const newOrder = await prisma.order.create({
            data: {
                table: order.table,
                customer: order.customer
            }
        });

        await prisma.foodOrdered.createMany({
            data: foodOrdereds.map(foodOrdered => ({ quantity: foodOrdered.quantity, foodId: foodOrdered.foodId, orderId: newOrder.id }))
        })

        const fullOrder = await prisma.order.findFirst({
            where: {
                id: newOrder.id
            },
            include: {
                foodOrdered: {
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
    const id = parseInt(req.params.id);

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