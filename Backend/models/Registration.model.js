import mongoose from "mongoose";

const registrationSchema = mongoose.Schema(
  {
  
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon_User",
      required: true
    },

    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
    },



    participationType: {
      type: String,
      enum: ["solo", "team"],
      default: "solo"
    },

   
    teamLeader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon_User"
    },

    
    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hackathon_User"
      }
    ],

  
    paymentStatus: {
      type: String,
      enum: ["free", "pending", "paid"],
      default: "free"
    },

    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String
  },
  { timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;
