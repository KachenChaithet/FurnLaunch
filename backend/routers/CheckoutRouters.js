import express from "express";
import { checkout } from "../controllers/CheckoutController.js";

const router = express.Router();

router.post("/", checkout);

export default router;
