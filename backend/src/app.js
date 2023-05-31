import express from "express";
import productRouter from "./routes/product";
import authRouter from "./routes/auth";
import uploadRouter from "./routes/upload";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import categoryRouter from "./routes/category";


// config
dotenv.config();
const app = express();
app.use(cors())
// middleware
app.use(express.json());


//router
app.use("/api", productRouter);
app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", uploadRouter);



// connect to db
mongoose.connect("mongodb://127.0.0.1:27017/angular");

export const viteNodeApp = app;

