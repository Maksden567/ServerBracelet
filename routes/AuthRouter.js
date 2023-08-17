import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
const authRouter=Router()
import {authMiddleware} from '../middleware/authMiddleware.js'
import {allowMiddleware} from '../middleware/allowMiddleware.js'


authRouter.post('/registerUser',authMiddleware,allowMiddleware(['superAdmin']),AuthController.registerUser)
authRouter.post('/login',AuthController.login)
authRouter.put('/changePassword',authMiddleware,AuthController.changePassword)
authRouter.get('/users',AuthController.getUsers)

export default authRouter
