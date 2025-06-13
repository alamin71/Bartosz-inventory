import mongoose from "mongoose";

const emailQueueSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    value: {
      type: String,
      required: [true, "Value is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model already exists before defining it
const EmailQueue =
  mongoose.models.EmailQueue || mongoose.model("EmailQueue", emailQueueSchema);

export default EmailQueue;
