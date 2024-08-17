import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getOrders,
  updateOrderStatus,
} from "../controllers/staff.controller.js";

const router = express.Router();

router.get("/orders", protectRoute, getOrders);
router.post("/update-order-status", protectRoute, updateOrderStatus);

export default router;
