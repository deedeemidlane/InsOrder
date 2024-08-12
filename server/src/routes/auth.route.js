import express from "express";
import {
  createAccount,
  getUser,
  login,
  logout,
} from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/user", protectRoute, getUser);
router.post("/create-account", createAccount);

router.post("/login", login);
router.post("/logout", logout);

export default router;
