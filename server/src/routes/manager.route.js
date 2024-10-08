import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  createDish,
  createStaffAccount,
  getMenu,
  getShopInfo,
  getStaffs,
} from "../controllers/manager.controller.js";

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinaryConfig.js";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../client/public/TempStorage/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "insorder-menu",
    // allowed_formats: ["jpeg", "png", "jpg"],
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/shop-info", protectRoute, getShopInfo);
router.post("/create-dish", protectRoute, upload.single("image"), createDish);
router.get("/menu", protectRoute, getMenu);
router.post("/create-staff-account", protectRoute, createStaffAccount);
router.get("/staffs", protectRoute, getStaffs);

export default router;
