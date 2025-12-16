import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    college: {
      type:String,
      required:true,

    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    hackathons: [
      {
        hackathon: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Hackathon",
        },
        result: {
          type: String,
          enum: ["pending", "winner", "lost"],
          default: "pending",
        },
        score: {
          type: Number,
          default: 0,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Hackathon_User", userSchema);
export default User;
