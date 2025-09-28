import express from "express";
import {
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} from "../controllers/OrderController.js";

const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
