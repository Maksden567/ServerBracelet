import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { allowsMiddleware } from "../middleware/allowMiddleware.js";
import ProductController from "../controllers/ProductController.js";

const ProductRoute = Router()

ProductRoute.post('/create',authMiddleware, allowsMiddleware(['superAdmin']),ProductController.createProduct)
ProductRoute.put('/update/:id',authMiddleware, allowsMiddleware(['superAdmin']),ProductController.updateProduct)
ProductRoute.get('/all', authMiddleware, allowsMiddleware(['superAdmin']),ProductController.getAllProduct)
ProductRoute.get('/enabled',ProductController.getEnableProduct)

export default ProductRoute
