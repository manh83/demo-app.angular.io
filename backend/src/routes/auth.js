import express from "express";
import { changePassword, forgotPassword, signin, signup } from "../controllers/auth";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin)
router.post("/forgot-password", forgotPassword)
router.post("/changePassword", changePassword)


export default router;
