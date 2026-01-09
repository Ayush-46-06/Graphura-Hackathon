import mongoose from "mongoose";
import { ROLES } from "../config/roles.js";

const adminSchema = new mongoose.Schema(
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
      default:null
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
      enum: [ROLES.ADMIN],
      default: ROLES.ADMIN
    },

    isActive: {
      type: Boolean,
      default: true
    },
    yearOfStudy:{
      type:String
    },
    courseName:{
      type:String
    },
    resetPasswordToken:{
      type:String
    },
    resetPasswordExpire:{
      type:Date
    }
  },
  { timestamps: true }
);

const Admin = mongoose.model("Hackathon_Admin", adminSchema);
export default Admin;