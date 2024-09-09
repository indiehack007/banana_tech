import { connectDB } from "../database/dbConnect.js";
import Template from "../models/templateModel.js";

export const handleUpdateTemplate = async (req, res) => {
  try {
    await connectDB();

    const { id } = req.params;
    const updates = req.body;

    const updatedTemplate = await Template.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.status(200).json(updatedTemplate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const handleGetTemplate = async (req, res) => {
  try {
    await connectDB();
    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleDeleteTemplate = async (req, res) => {
  try {
    await connectDB();

    const { id } = req.params;

    const deletedTemplate = await Template.findByIdAndDelete(id);

    if (!deletedTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }

    res
      .status(200)
      .json({ message: "Template successfully deleted", deletedTemplate });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const handleGetTemplateById = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    res.status(200).json(template);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const handleSubmitTemplate = async (req, res) => {
  try {
    await connectDB();
    const {
      mainText,
      subText,
      popupLocation,
      bgColor,
      mainTextColor,
      subtextColor,
      borderColor,
      triggerEvent,
      disappearTime,
      linkToRedirect,
      imageUrl,
      typeOfFeature,
      stripeApi,
      analytics,
    } = req.body;

    const template = new Template({
      mainText,
      subText,
      popupLocation,
      bgColor,
      mainTextColor,
      subtextColor,
      borderColor,
      triggerEvent,
      disappearTime,
      linkToRedirect,
      imageUrl,
      typeOfFeature,
      stripeApi,
      analytics,
    });

    const savedTemplate = await template.save();
    res.status(201).json(savedTemplate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
