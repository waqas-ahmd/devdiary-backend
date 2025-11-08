import jwt from "jsonwebtoken";

export const generateToken = (payload: string) => {
  return jwt.sign({ id: payload }, process.env.JWT_SECRET_KEY!, {
    expiresIn: 365 * 24 * 60 * 60, // 1 year
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY!);
  } catch (error) {
    return null;
  }
};
