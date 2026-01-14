import mongoose from "mongoose";
import { ROLES } from "../config/roles.js";

const judgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    address: {
      type: String,
      required: true
    },

    contactNumber: {
      type: String,
      required: true
    },

    university: {
      type: String,
      required: true
    },

    collegeName: {
      type: String,
      default: null
    },

    occupation: {
      type: String,
      default: null
    },

    company: {
      type: String,
      default: null
    },

    image: {
      type: String,
      default: null
    },

    role: {
      type: String,
      enum: [ROLES.JUDGE],
      default: ROLES.JUDGE
    },

    isActive: {
      type: Boolean,
      default: true
    },

    yearOfStudy: {
      type: String
    },

    courseName: {
      type: String
    },

    resetPasswordToken: {
      type: String
    },

    resetPasswordExpire: {
      type: Date
    }
  },
  { timestamps: true }
);

const Judge = mongoose.model("Hackathon_Judge", judgeSchema);
export default Judge;