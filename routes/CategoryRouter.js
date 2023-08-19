import {Router} from 'express'
import CategoryController from '../controllers/CategoryController.js'
import { authMiddleware } from "../middleware/authMiddleware.js";
import { allowMiddleware } from "../middleware/allowMiddleware.js";


const CategoryRouter = Router()

CategoryRouter.post('/create',authMiddleware,allowMiddleware(['superAdmin']),CategoryController.postCategory)
CategoryRouter.put('/update/:id',authMiddleware,allowMiddleware(['superAdmin']),CategoryController.updateCategory)
CategoryRouter.get('/all',authMiddleware,allowMiddleware(['superAdmin']),CategoryController.getAllCategories)
CategoryRouter.get('/enabled',CategoryController.getEnableCategories)

export default CategoryRouter