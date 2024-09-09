import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    mainText: { type: String, required: true },
    subText: { type: String, require: true },
    popupLocation: {
      type: String,
      enum: ["top-left", "top-right", "bottom-left", "bottom-right"],
      default: "top-right",
    },
    bgColor: { type: String, default: "#ffffff" },
    mainTextColor: { type: String, default: "#000000" },
    subtextColor: { type: String, default: "#666666" },
    borderColor: { type: String, default: "#cccccc" },
    triggerEvent: {
      type: Number,
      default: 0,
    },
    disappearTime: { type: Number, default: 5000 },
    linkToRedirect: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    typeOfFeature: {
      type: String,
      enum: ["faq", "awareness", "conversion"],
      default: "awareness",
    },
    stripeApi: { type: String, default: "" },
    analytics: {
      clicks: { type: Number, default: 0 },
      views: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);

export default Template;
