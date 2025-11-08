import express from "express";
import { signUp, signIn, getProfile } from "../controllers/user.js";
import { auth } from "../middleware/authentication.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/profile", auth, getProfile);

export default router;
