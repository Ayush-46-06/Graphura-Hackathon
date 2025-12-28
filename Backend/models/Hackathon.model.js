import mongoose from "mongoose";


const winnerDetailSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon_User",
      required: true
    },
    rank: {
      type: Number,
      enum: [1, 2, 3],
      required: true
    },
    prizeAmount: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);


const hackathonSchema = new mongoose.Schema(
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
      type: String,
      required: true
    },

    prizePool: {
      type: Number,
      required: true
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Coding",
        "Design",
        "AI/ML",
        "Blockchain",
        "Web Development",
        "Mobile Apps"
      ]
    },

    tags: {
      type: [String],
      default: ["Open for All"]
    },

    startDate: Date,
    endDate: Date,

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


    winnerDetails: {
      type: [winnerDetailSchema],
      default: []
    },

    about: String,
    prizeDetails: String,
    lastEnrollmentDate: Date,

 
    sponsors: {
      type: [String],
      default: []
    },

    judges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hackathon_Admin"
      }
    ]
  },
  { timestamps: true }
);

const Hackathon = mongoose.model("Hackathon", hackathonSchema);
export default Hackathon;
