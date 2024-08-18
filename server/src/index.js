import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import managerRoutes from "./routes/manager.route.js";
import staffRoutes from "./routes/staff.route.js";
import customerRoutes from "./routes/customer.route.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3001;

app.use(cookieParser()); // for parsing cookie
app.use(express.json()); // for parsing application/json

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/customer", customerRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
