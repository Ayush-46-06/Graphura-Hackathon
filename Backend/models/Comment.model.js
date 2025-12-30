import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon_User",
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 1000,
    },

    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
