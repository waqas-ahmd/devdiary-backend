import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.js";
import { generateToken } from "../utils/jwt.js";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());
    await user.save();

    return res
      .status(201)
      .json({ message: "User created successfully", token });
  } catch (error: any) {
    console.log(error);

    // duplicate key(email) error
    if (error.code === 11000)
      return res.status(400).json({ message: "Email already exists" });

    // other errors
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Account not found, please sign up" });

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Incorrect password" });

    const token = generateToken(user._id.toString());

    return res
      .status(200)
      .json({ message: "User signed in successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  return res.status(200).json({ user: req.user });
};
