import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { createShop, getShops } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/create-shop", protectRoute, createShop);
router.get("/shops", protectRoute, getShops);

export default router;
