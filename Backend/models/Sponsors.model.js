import mongoose from "mongoose";

const sponsorsSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    companyHQ: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },

    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
      required: true,
    },
  },
  { timestamps: true }
);

sponsorsSchema.index({ email: 1, hackathon: 1 }, { unique: true });

export default mongoose.model("Sponsors", sponsorsSchema);
