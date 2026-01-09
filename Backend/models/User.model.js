import mongoose from "mongoose";
import { ROLES, ROLE_ARRAY } from "../config/roles.js";

const userSchema = new mongoose.Schema(
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

    image: {
      type: String,
      default: null
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
      required: true,
      trim: true
    },

    courseName: {
      type: String,
      trim: true
    },

    yearOfStudy: {
      type: String,
      trim: true
    },

    occupation: {
      type: String,
      default: null
    },

    company: {
      type: String,
      default: null
    },

    role: {
      type: String,
      enum: ROLE_ARRAY,
      default: ROLES.USER
    },

    isActive: {
      type: Boolean,
      default: true
    },

    wallet: {
      type: Number,
      default: 0
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  { timestamps: true }
);

const User = mongoose.model("Hackathon_User", userSchema);
export default User;