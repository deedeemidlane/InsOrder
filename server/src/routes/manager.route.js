import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  createDish,
  createStaffAccount,
  getMenu,
  getShopInfo,
  getStaffs,
} from "../controllers/manager.controller.js";

const router = express.Router();

router.get("/shop-info", protectRoute, getShopInfo);
router.post("/create-dish", protectRoute, createDish);
router.get("/menu", protectRoute, getMenu);
router.post("/create-staff-account", protectRoute, createStaffAccount);
router.get("/staffs", protectRoute, getStaffs);

export default router;
