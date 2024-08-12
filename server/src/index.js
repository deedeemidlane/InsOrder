import express from "express";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3001;

app.use(cookieParser()); // for parsing cookie
app.use(express.json()); // for parsing application/json

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
