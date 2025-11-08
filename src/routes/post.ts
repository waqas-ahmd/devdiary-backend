import express from "express";
import {
  createPost,
  getPublicPosts,
  getPostByHandle,
  getPostById,
  getUserPosts,
  updatePost,
  deletePost,
  searchPosts,
} from "../controllers/post.js";
import { auth } from "../middleware/authentication.js";

const router = express.Router();

router.post("/", auth, createPost);
router.get("/", auth, getUserPosts);
router.get("/public", getPublicPosts);
router.get("/public/:handle", getPostByHandle);
router.get("/search", searchPosts);
router.get("/:id", auth, getPostById);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

export default router;
