import { Router } from "express";
import SubCollectionsController from "../controllers/SubCollectionsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { allowMiddleware } from "../middleware/allowMiddleware.js";

const SubCollectionsRouter = Router()


SubCollectionsRouter.post('/create',authMiddleware,allowMiddleware(['superAdmin']),SubCollectionsController.createSubCollection)
SubCollectionsRouter.get('/all',authMiddleware,allowMiddleware(['superAdmin']),SubCollectionsController.getAll)
SubCollectionsRouter.put('/update/:id',authMiddleware,allowMiddleware(['superAdmin']),SubCollectionsController.updateSubCollections)
SubCollectionsRouter.get('/enabled',SubCollectionsController.getEnabled)

export default SubCollectionsRouter