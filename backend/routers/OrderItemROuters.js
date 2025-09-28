import express from "express";
import {
    getAllOrderItems,
    getOrderItemById,
    updateOrderItem,
    deleteOrderItem
} from "../controllers/OrderItemController.js";

const router = express.Router();

router.get("/", getAllOrderItems);
router.get("/:id", getOrderItemById);
router.put("/:id", updateOrderItem);
router.delete("/:id", deleteOrderItem);

export default router;
