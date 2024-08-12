import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    req.payload = decoded;

    next();
  } catch (error) {
    console.log("Error in protectRoute controller: ", error.message);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
};

export default protectRoute;
