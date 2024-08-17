import express from "express";
import {
  getMenu,
  getOrder,
  getShopInfo,
  placeOrder,
} from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/menu", getMenu);
router.post("/shop-info", getShopInfo);
router.post("/place-order", placeOrder);
router.post("/order", getOrder);

export default router;
