import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      trim: true,
    },
    email: {
      required: true,
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      required: true,
      type: String,
      select: false,
      trim: true,
    },
    contactNumber: {
      type: String,
    },
    university: {
      type: String,
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    hackathons:[
      {
        hackathon:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Hackathon"
        },
        result:{
          type:String,
          enum:["pending","winner","lost"],
          default:"pending"
        },
        score:{
          type:Number,
          default:0
        }
      }
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
