import jwt from "jsonwebtoken";
import { Constants } from "../utils/Constants.js";
import User from "../models/userSchema.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);


       if (!user || new Date() > user.sessionExpiresAt) {
        return res.status(401).json({ message: "Session expired. Please login again." });
      }
     req.user = user;         
      req.userId = user._id;    
      next();
    } catch (error) {
      return res
        .status(401)
        .json({
          status: "error",
          message: Constants.ERROR_MESSAGES.UNAUTHORIZED,
        });
    }
  } else {
    return res
      .status(401)
      .json({
        status: "error",
        message: Constants.ERROR_MESSAGES.UNAUTHORIZED,
      });
  }
};

// export const admin = (req, res, next) => {
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     res
//       .status(403)
//       .json({ status: 'error', message: Constants.ERROR_MESSAGES.UNAUTHORIZED });
//   }
// };

export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};



