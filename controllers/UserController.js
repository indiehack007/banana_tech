import Template from "../models/templateModel.js";
import User from "../models/UserModel.js";

export const handleCreateUser = async (req, res) => {
  try {
    const { username, email, password, websites } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user with or without websites
    const newUser = new User({
      username,
      email,
      password, // Make sure to hash the password before saving in a real app
      websites: websites || [], // Default to an empty array if websites are not provided
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleUpdateUserWebsites = async (req, res) => {
  try {
    // console.log("hii")
    const { userId } = req.params; // Extract userId from request parameters
    const { website, templates } = req.body; // Extract website and templates from request body

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Push new website and templates to the user's websites array
    user.websites.push({
      website, // Website URL
      templates, // Array of template IDs (or strings)
    });

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleAddTemplatesToWebsite = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request parameters
    const { website, templates } = req.body; // Extract website and newTemplates from request body

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the website object within the user's websites array
    const websiteObject = user.websites.find((w) => w.website === website);
    if (!websiteObject) {
      return res.status(404).json({ message: "Website not found" });
    }

    const array = websiteObject.templates;
    array.push(templates);

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetUser = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request parameters

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user details
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetWebsiteTemplates = async (req, res) => {
  console.log("hi")
  try {
    const { userId, websiteId } = req.params; // Extract userId and websiteId from the request parameters

    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the website in the user's websites array
    const website = user.websites.id(websiteId);

    if (!website) {
      return res.status(404).json({ message: "Website not found" });
    }

    // Return the templates associated with the website
    res.status(200).json(website.templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleDeleteWebsite = async (req, res) => {
  try {
    const { userId, websiteId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const websiteIndex = user.websites.findIndex(
      (website) => website._id.toString() === websiteId
    );

    if (websiteIndex === -1) {
      return res.status(404).json({ error: "Website not found for this user" });
    }

    // Remove the website from the array
    user.websites.splice(websiteIndex, 1);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Website deleted successfully" });
  } catch (error) {
    console.error("Error deleting website:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the website" });
  }
};



export const handleDeleteTemplateWebsite= async (req,res)=>{
  try {
    const {userId, websiteId, templateId } = req.params;

    // Find the website
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const website = user.websites.id(websiteId);
    if (!website) {
      return res.status(404).json({ error: 'Website not found' });
    }

    const templateIndex = website.templates.find((i)=> i=== templateId);
    if (templateIndex === -1) {
      return res.status(404).json({ error: 'Template not found' });
    }

    website.templates.splice(templateIndex, 1);

    await user.save();

    res.status(200).json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Error deleting template:', error);
    res.status(500).json({  
 error: 'Internal server error' });
  }
};