import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export const protect = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    logger.error("Auth Error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
