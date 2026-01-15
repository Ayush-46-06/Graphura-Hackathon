import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["heading", "paragraph", "list", "image", "quote"],
      required: true
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },

    category: {
      type: String,
      trim: true,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    sections: {
      type: [sectionSchema],
      required: true
    },

    publishedAt: {
      type: Date,
      default: Date.now
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon_Admin",
      required: true
    }
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;