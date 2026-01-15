import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon_User",
      required: true,
    },

    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentId: {
      type: String,
      default: null
    },

    razorpayOrderId: {
      type: String,
      default: null
    },

    status: {
      type: String,
      enum: ["success", "pending", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
