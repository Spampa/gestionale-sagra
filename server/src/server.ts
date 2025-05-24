//server
import express from 'express';
import cors from "cors"
import dotenv from 'dotenv';
dotenv.config();

//logger
import morgan from 'morgan'
import { loggerMiddleware } from '@/middlewares/loggerMiddleware';

//docs
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

//routes
import loginRoutes from "@/routes/auth/login.route"
import categoryRoutes from "@/routes/category.route"
import foodRoutes from "@/routes/food.routes"
import orderRoutes from "@/routes/order.route"
import roleRoutes from "@/routes/role.route"
import userRoutes from "@/routes/user.route"

//app config
const app = express();
const port = process.env.PORT;

app.use(morgan('combined'));

app.use(cors());
app.use(express.json());
app.use(cors({ origin: '*' }));

//log middleware
app.use(loggerMiddleware);

//docs
const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, "../docs/swagger.yaml"), "utf8")
) as object;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/auth/login", loginRoutes)
app.use("/categories", categoryRoutes);
app.use("/foods", foodRoutes);
app.use("/orders", orderRoutes);
app.use("/roles", roleRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
  console.log(`Documentation: http://localhost:${port}/api-docs`);
});