import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
const authRouter=Router()


authRouter.post('/registerUser',AuthController.registerUser)
authRouter.put('/changePassword/:id',AuthController.changePassword)
authRouter.get('/users',AuthController.getUsers)

export default authRouter
