import  express  from "express";
import { removeProductCart, cartAddProduct, getAllCartProducts } from "../controllers/cart";

const router = express.Router()
router.get("/cart",getAllCartProducts)
router.post("/cart/add",cartAddProduct)
router.delete("/cart/remove/:id", removeProductCart);


export default router