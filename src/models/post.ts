import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    handle: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    featuredImage: { type: String },
    status: { type: String, enum: ["published", "draft"], default: "draft" },
    publishedAt: { type: Date },
    tags: [{ type: String }],
    readingTime: { type: Number },
  },
  {
    timestamps: true,
  }
);

postSchema.index({
  handle: "text",
  title: "text",
  content: "text",
  tags: "text",
});

const Post = mongoose.model("Post", postSchema);

export default Post;
