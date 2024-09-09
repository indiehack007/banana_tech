import express from "express";
import { handleDeleteTemplate, handleGetTemplate, handleGetTemplateById, handleSubmitTemplate, handleUpdateTemplate } from "../controllers/templateControllers.js";
const templateRoute=express.Router();


templateRoute.get("/v1/template", handleGetTemplate);
templateRoute.get("/v1/template/:id", handleGetTemplateById);
templateRoute.post("/v1/template",handleSubmitTemplate);
templateRoute.put("/v1/template/:id", handleUpdateTemplate);
templateRoute.delete("/v1/template/:id", handleDeleteTemplate);

export default templateRoute;