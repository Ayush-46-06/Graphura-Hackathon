import mongoose from "mongoose";

const hackathonSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
    participants: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    winners: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Hackathon = mongoose.model("Hackathon",hackathonSchema)
export default Hackathon