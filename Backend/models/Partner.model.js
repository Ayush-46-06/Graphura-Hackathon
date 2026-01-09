import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    workEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    companyHQ: {
      type: String,
      required: true,
      trim: true
    },

    message: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

const Partner = mongoose.model("Partner", partnerSchema);
export default Partner;