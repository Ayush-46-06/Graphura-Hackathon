import mongoose from "mongoose";
import { ROLES } from "../config/roles.js";
const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
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
    },

    city: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      default: ROLES.COLLEGE,
    },

    state: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    shortName: {
      type: String,
      trim: true,
      uppercase: true,
      index: true,
    },

    alternateEmail: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

const College = mongoose.model("College", collegeSchema);
export default College;
