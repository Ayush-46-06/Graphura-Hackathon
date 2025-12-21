import mongoose from "mongoose";
import { ROLES,ROLE_ARRAY } from "../config/roles.js";
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false, trim: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    university: { type: String, required: true },
    college: { type:String, required:true },
    role: { type: String, enum: ROLE_ARRAY, default: ROLES.USER },
    isActive: { type: Boolean, default: true },

  
    wallet: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);
const User = mongoose.model("Hackathon_User", userSchema);
export default User;
