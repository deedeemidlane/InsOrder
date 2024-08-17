import express from "express";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import managerRoutes from "./routes/manager.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
