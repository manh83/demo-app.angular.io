import express from "express";
import { createOrder, get, getOrderList, removeOrder, updateOrder } from "../controllers/order";
const router = express.Router()
router.post("/order",createOrder)
router.get("/order",getOrderList)
router.get("/order/:id",get)
router.delete("/order/:id",removeOrder)
router.patch("/order/:id",updateOrder)



export default router