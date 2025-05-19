import express from 'express';
import cors from "cors"
import dotenv from 'dotenv';
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

dotenv.config();

import categoryRoutes from "@/routes/category.route"
import foodRoutes from "@/routes/food.routes"
import orderRoutes from "@/routes/order.route"

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

//docs
const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, "../docs/swagger.yaml"), "utf8")
) as object;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/categories", categoryRoutes);
app.use("/foods", foodRoutes);
app.use("/orders", orderRoutes);

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});