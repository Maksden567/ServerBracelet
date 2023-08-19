import { Router } from "express";
import UploadController from "../controllers/UploadController.js";
import multer from 'multer'

const UploadRouter = Router()
const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });

UploadRouter.post('/',  upload.array("pic"), UploadController.upload)


export default UploadRouter
