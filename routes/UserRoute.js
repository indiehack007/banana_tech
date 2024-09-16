import express from "express";
import User from "../models/UserModel.js";
import Template from "../models/templateModel.js";
import { connectDB } from "../database/dbConnect.js"; 
import { handleAddTemplatesToWebsite, handleCreateUser, handleDeleteTemplateWebsite, handleDeleteWebsite, handleGetUser, handleGetWebsiteTemplates, handleUpdateUserWebsites } from "../controllers/UserController.js";

const userRoute = express.Router();

// POST request to create a new user
userRoute.get("/v1/user/:userId", handleGetUser);
userRoute.get("/v1/user/:userId/websites/:websiteId", handleGetWebsiteTemplates);
userRoute.post("/v1/user",handleCreateUser);
userRoute.put("/v1/user/:userId/websites", handleUpdateUserWebsites);
userRoute.put("/v1/user/:userId/websites/templates", handleAddTemplatesToWebsite);
userRoute.delete('/v1/user/:userId/websites/:websiteId', handleDeleteWebsite);
userRoute.delete('/v1/user/:userId/websites/:websiteId/:templateId', handleDeleteTemplateWebsite);


export default userRoute;
