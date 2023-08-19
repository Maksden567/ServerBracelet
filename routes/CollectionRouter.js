import {Router} from 'express'
import CollectionController from '../controllers/CollectionController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";
import { allowMiddleware } from "../middleware/allowMiddleware.js";


const CollectionRoute = Router()

CollectionRoute.post('/create',authMiddleware,allowMiddleware(['superAdmin']),CollectionController.postCollection)
CollectionRoute.put('/update/:id',authMiddleware,allowMiddleware(['superAdmin']),CollectionController.updateCollection)
CollectionRoute.get('/all',authMiddleware,allowMiddleware(['superAdmin']),CollectionController.getAllCollections)
CollectionRoute.get('/enabled',CollectionController.getEnabledCollections)

export default CollectionRoute