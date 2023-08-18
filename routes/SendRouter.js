import { Router } from "express";
import SendController from "../controllers/SendController.js";

const SendRouter = Router()

SendRouter.post('/send',SendController.send)


export default SendRouter
