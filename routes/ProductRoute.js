import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { allowMiddleware } from "../middleware/allowMiddleware.js";
import ProductController from "../controllers/ProductController.js";

const ProductRoute = Router()

ProductRoute.post('/create',authMiddleware, allowMiddleware(['superAdmin']),ProductController.createProduct)
ProductRoute.put('/update/:id',authMiddleware, allowMiddleware(['superAdmin']),ProductController.updateProduct)
ProductRoute.get('/all', authMiddleware, allowMiddleware(['superAdmin']),ProductController.getAllProduct)
ProductRoute.get('/enabled',ProductController.getEnableProduct)

export default ProductRoute
