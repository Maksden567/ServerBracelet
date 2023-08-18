import { Router } from "express";
import UploadController from "../controllers/UploadController.js";

const UploadRouter = Router()

UploadRouter.post('/',UploadController.upload)


export default UploadRouter
