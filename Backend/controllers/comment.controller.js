import Comment from "../models/Comment.model.js";
import Hackathon from "../models/Hackathon.model.js";

export const addComment = async (req, res) => {
  try {
    const { hackathonId, text, parentCommentId } = req.body;
    const userId = req.user._id;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required"
      });
    }

    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon) {
      return res.status(404).json({
        success: false,
        message: "Hackathon not found"
      });
    }

    const comment = await Comment.create({
      hackathon: hackathonId,
      user: userId,
      text,
      parentComment: parentCommentId || null
    });

    if (parentCommentId) {
      await Comment.findByIdAndUpdate(parentCommentId, {
        $push: { replies: comment._id }
      });
    }

    hackathon.comments.push(comment._id);
    await hackathon.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: comment
    });

  } catch (error) {
    console.error("ADD COMMENT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add comment"
    });
  }
};


export const getHackathonComments = async (req, res) => {
  try {
    const { hackathonId } = req.params;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Comment.countDocuments({
      hackathon: hackathonId,
      isDeleted: false
    });

    const comments = await Comment.find({
      hackathon: hackathonId,
      isDeleted: false
    })
      .populate("user", "name image")
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: comments,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalItems: total
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch comments"
    });
  }
};




export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);

    if (!comment || comment.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can edit only your own comment"
      });
    }

    comment.text = text;
    await comment.save();

    res.json({
      success: true,
      message: "Comment updated",
      data: comment
    });

  } catch (error) {
    console.error("UPDATE COMMENT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update comment"
    });
  }
};


export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can delete only your own comment"
      });
    }

    comment.isDeleted = true;
    comment.text = "[deleted]";
    await comment.save();

    res.json({
      success: true,
      message: "Comment deleted"
    });

  } catch (error) {
    console.error("DELETE COMMENT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete comment"
    });
  }
};
