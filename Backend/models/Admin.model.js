import mongoose from "mongoose";
import { ROLES } from "../config/roles.js";

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    role: {
        type: String,
        enum: [ROLES.ADMIN, ROLES.USER], 
        default: ROLES.ADMIN
    }
}, { timestamps: true });

const Admin = mongoose.model("Hackathon_Admin", adminSchema);
export default Admin;
