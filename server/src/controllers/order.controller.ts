import { Request, Response } from "express";
import { FoodsOrdered, Order } from "@generated/prisma";
import generateOrderId from "@/lib/idGenerator";

import prisma from "@/utils/prisma";

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    const orders = await prisma.order.findMany({
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
        }
    });
    res.status(200).json(orders);
}

export const getDailyOrders = async (req: Request, res: Response): Promise<void> => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const orders = await prisma.order.findMany({
        where: {
            dateTime: {
                gte: today,
                lt: tomorrow
            }
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
        orderBy: {
            dateTime: "desc"
        }
    });

    if (orders.length === 0) {
        res.status(404).json({ message: "Daily orders not found" });
        return;
    }
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

export const searchOrder = async (req: Request, res: Response): Promise<void> => {
    const value = req.params.value;

    const orders = await prisma.order.findMany({
        where: {
            OR: [
                { id: value },
                { table: { contains: value } },
                { customer: { contains: value } }
            ]
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
        }
    });

    if (orders.length === 0) {
        res.status(404).json({ message: "Order not found" });
        return;
    }

    res.status(200).json(orders);
}

export const searchDailyOrder = async (req: Request, res: Response): Promise<void> => {
    const value = req.params.value;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const orders = await prisma.order.findMany({
        where: {
            dateTime: {
                gte: today,
                lt: tomorrow
            },
            OR: [
                { id: value },
                { table: { contains: value } },
                { customer: { contains: value } }
            ]
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
        }
    });

    if (orders.length === 0) {
        res.status(404).json({ message: "Order not found" });
        return;
    }

    res.status(200).json(orders);
}

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    const order: Order = req.body;
    const foodsOrdereds: Array<FoodsOrdered> = req.body.foodsOrdered;

    let price = 0;
    for (const foodOrder of foodsOrdereds) {
        const food = await prisma.food.findUnique({ where: { id: foodOrder.foodId } })
        if (!food) {
            res.status(400).json({
                error: "Food not exists"
            })
            return;
        }

        price += Number(food?.price ?? 0) * Number(foodOrder.quantity);
    }

    try {
        const newOrder = await prisma.order.create({
            data: {
                id: await generateOrderId(),
                table: order.table.toString(),
                customer: order.customer,
                price: price.toFixed(2).toString()
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