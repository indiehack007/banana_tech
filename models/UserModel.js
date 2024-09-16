import mongoose from "mongoose";

// Define the schema for the User
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    userType: {
      type: String,
      enum: ["basic", "elite", "pro"],
      default: "basic",
    },
    websites: [
      {
        website: { type: String }, // Website URL (no longer required)
        templates: [String], // Array of strings for each website (e.g., template IDs or other strings)
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
