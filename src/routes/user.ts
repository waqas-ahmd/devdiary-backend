import express from "express";
import { signUp, signIn, getProfile } from "../controllers/user.js";
import { auth } from "../middleware/authentication.js";

const router = express.Router();

router.post("/register", signUp);
router.post("/login", signIn);
router.get("/profile", auth, getProfile);

export default router;
