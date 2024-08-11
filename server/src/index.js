import express from "express";
import authRoutes from "./routes/auth.route.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3001;

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
