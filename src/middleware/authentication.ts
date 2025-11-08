import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import { verifyToken } from "../utils/jwt.js";

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Please Sign in First!" });
    }

    const decoded = verifyToken(token) as { id: string } | null;

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(decoded.id, " -password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
