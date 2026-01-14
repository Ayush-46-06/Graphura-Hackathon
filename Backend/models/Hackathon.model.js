import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon_User",
      required: true
    },

    githubLink: {
      type: String,
      default: null
    },

    driveVideoLink: {
      type: String,
      default: null
    },

    submittedAt: {
      type: Date,
      default: null
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon_Judge",
      default: null
    },
    reviewedByName: {
  type: String,
  default: null
},

    rank: {
      type: Number,
      enum: [1, 2, 3],
      default: null
    }
  },
  { _id: false }
);

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
      enum: [
        "Coding",
        "Design",
        "AI/ML",
        "Blockchain",
        "Web Development",
        "Mobile Apps"
      ],
      required: true
    },

    tags: {
      type: [String],
      default: ["Open for All"]
    },

    startDate: Date,
    endDate: Date,

    lastEnrollmentDate: Date,

    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming"
    },

    participants: {
      type: [participantSchema],
      default: []
    },

    judges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hackathon_Judge"
      }
    ],

    winnerDetails: {
      type: [winnerDetailSchema],
      default: []
    },

    about: String,
    prizeDetails: String,

    sponsors: [
      {
        name: String,
        logo: String
      }
    ],

    isPaid: {
      type: Boolean,
      default: false
    },

    entryFee: {
      type: Number,
      default: 0
    },

    participationType: {
      type: String,
      enum: ["solo", "team"],
      default: "solo"
    },

    maxTeamSize: {
      type: Number,
      default: 1
    },

    activityPdf: {
      type: String
    },

    activityMailSent: {
      type: Boolean,
      default: false
    },

    reminderMailSent: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Hackathon = mongoose.model("Hackathon", hackathonSchema);
export default Hackathon;