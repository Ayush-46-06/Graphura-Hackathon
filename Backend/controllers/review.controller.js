
import Review from "../models/review.model.js"

export const addReview = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user._id; 
    const { text } = req.body;

    const review = await Review.create({
      user: userId,
      text,
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review, 
    });
  } catch (error) {
    console.log("ADD REVIEW ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit review",
    });
  }
};


export const getAllReview =async (req,res) =>{
    try{
        const review =await Review.find().populate("user", "name image")
        res.json({
            success:true,
            message:"get all reviews successfully",
            review
        })
    }catch(error){
        console.log("GET ALL REVIEW ERROR : ", error)
        res.status(500).json({
            status:false,
            message:"failed to get all reviews"
        })
    }
}


export const deleteReview = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user._id;
    const reviewId = req.params.id;

 
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own review",
      });
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });

  } catch (error) {
    console.log("DELETE REVIEW ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
    });
  }
};


export const updateReview = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user._id;
    const reviewId = req.params.id;
    const { updatedText } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }


    if (userId.toString() !== review.user.toString()) {
      return res.status(403).json({
        success: false,
        message: "You cannot update other user's review",
      });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { text: updatedText },
      { new: true } 
    );

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review: updatedReview,
    });
  } catch (error) {
    console.log("UPDATE REVIEW ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update review",
    });
  }
};
