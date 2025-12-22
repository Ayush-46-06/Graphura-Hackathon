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
      enum: ["Coding", "Design", "AI/ML", "Blockchain", "Web Development", "Mobile Apps"]
    },

tags: {
  type: [
    {
      type: String,
      enum: [
        "Blockchain",
        "Web3",
        "Cyber Security",
        "Cloud Computing",
        "DevOps",
        "C",
        "C++",
        "Go",
        "Beginner Friendly",
        "Intermediate",
        "Advanced",
        "Open for All",
        "Coding",
        "AI"
      ]
    }
  ],
  default: ["Open for All"]
},


    startDate: {
      type: Date,
  
    },

    endDate: {
      type: Date,
    
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
    ],

  
    about: {
      type: String
    },

    prizeDetails: {
      type: String
    },

    lastEnrollmentDate: {
      type: Date
    },

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
