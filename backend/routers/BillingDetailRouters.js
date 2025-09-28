import express from 'express'
import { createBillingDetail, deleteBillingDetail, getAllBillingDetails, getBillingDetailById, updateBillingDetail } from '../controllers/BillingDetailController.js';

const router = express.Router()

router.get("/", getAllBillingDetails);
router.get("/:id", getBillingDetailById);
router.post("/", createBillingDetail);
router.put("/:id", updateBillingDetail);
router.delete("/:id", deleteBillingDetail);


export default router