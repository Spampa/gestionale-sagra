import { FoodsOrderd } from "./foodOrdered"

export type Order = {
    id: string,
    dateTime: Date,
    table: string,
    customer: string,
    foodsOrdered: Array<FoodsOrderd>
}