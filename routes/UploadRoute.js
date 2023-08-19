import { Router } from "express";
import UploadController from "../controllers/UploadController.js";
import multer from 'multer'
import { authMiddleware } from "../middleware/authMiddleware.js";
import { allowMiddleware } from "../middleware/allowMiddleware.js";

const UploadRouter = Router()
const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });

UploadRouter.post('/',authMiddleware,allowMiddleware(['superAdmin']),  upload.array("pic"), UploadController.upload)


export default UploadRouter
