import jwt from "jsonwebtoken";

export const generateToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: "365d",
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY!);
  } catch (error) {
    return null;
  }
};
