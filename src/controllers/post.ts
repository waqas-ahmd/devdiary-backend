import { Request, Response } from "express";
import Post from "../models/post.js";
import { createHandle, getReadingTime } from "../utils/posts.js";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, featuredImage, status, tags } = req.body;
    const author = req.user._id;

    const readingTime = getReadingTime(content);
    const baseHandle = createHandle(title);
    let handle = baseHandle;
    let counter = 1;

    // Check for existing handles and add suffix if needed
    while (await Post.findOne({ handle })) {
      handle = `${baseHandle}-${counter++}`;
    }

    const post = new Post({
      title,
      content,
      featuredImage,
      status,
      tags,
      author,
      readingTime,
      handle,
    });

    if (status === "published") post.publishedAt = new Date();

    await post.save();

    return res.status(201).json({
      message:
        post.status === "published"
          ? "Post published successfully"
          : "Draft saved successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPublicPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ status: "published" })
      .populate("author", "name email")
      .sort({ publishedAt: -1 });

    return res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostByHandle = async (req: Request, res: Response) => {
  try {
    const { handle } = req.params;

    const post = await Post.findOne({ handle, status: "published" }).populate(
      "author",
      "name email"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate("author", "-password");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (
      post.status === "draft" &&
      post.author._id.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to draft post" });
    }

    return res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const searchPosts = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const posts = await Post.find(
      { $text: { $search: query }, status: "published" },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .populate("author", "name email");

    return res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;

    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate("author", "name email");

    return res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findOneAndDelete({ _id: id, author: userId });

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found or unauthorized" });
    }

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { title, content, featuredImage, status, tags } = req.body;

    const post = await Post.findOne({ _id: id, author: userId });

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found or unauthorized" });
    }

    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
      post.readingTime = getReadingTime(content);
    }
    if (featuredImage !== undefined) post.featuredImage = featuredImage;
    if (status) post.status = status;
    if (tags) post.tags = tags;

    if (status === "published" && !post.publishedAt) {
      post.publishedAt = new Date();
    }

    await post.save();

    if (status) {
      return res.status(200).json({
        message:
          post.status === "published"
            ? "Post published!"
            : "Post saved as draft!",
        post,
      });
    }

    return res.status(200).json({
      message: "Post updated!",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
