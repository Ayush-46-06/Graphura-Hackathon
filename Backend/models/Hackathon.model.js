import mongoose from "mongoose";

const hackathonSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    image: {
      type: String, // image URL
      required: true
    },

    prizePool: {
      type: Number,
      required: true
    },

    category: {
      type: String,
      required: true,
      enum: ["coding", "design", "ai", "blockchain", "general"]
    },

    tags: {
      type: [String],
      required: true
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming"
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hackathon_User"
      }
    ],

    winners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hackathon_User"
      }
    ]
  },
  { timestamps: true }
);

const Hackathon = mongoose.model("Hackathon", hackathonSchema);
export default Hackathon;
