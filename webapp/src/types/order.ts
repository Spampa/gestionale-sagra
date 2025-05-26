import { FoodsOrderd } from "./foodOrdered"

export type Order = {
    id: string,
    dateTime: Date,
    table: string,
    customer: string,
    price?: number
    foodsOrdered: Array<FoodsOrderd>
}