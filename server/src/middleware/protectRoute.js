import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    console.log(authorization);

    if (authorization && authorization.startsWith("Bearer ")) {
      const token = authorization.slice("Bearer ".length);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) {
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
      }

      req.payload = decoded;

      next();
    } else {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }
  } catch (error) {
    console.log("Error in protectRoute controller: ", error.message);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
};

export default protectRoute;
