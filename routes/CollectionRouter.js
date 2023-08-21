import {Router} from 'express'
import CollectionController from '../controllers/CollectionController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";
import { allowMiddleware } from "../middleware/allowMiddleware.js";
import SubCollectionsController from '../controllers/SubCollectionsController.js';


const CollectionRoute = Router()

CollectionRoute.post('/create',authMiddleware,allowMiddleware(['superAdmin']),CollectionController.postCollection)
CollectionRoute.put('/update/:id',authMiddleware,allowMiddleware(['superAdmin']),CollectionController.updateCollection)
CollectionRoute.get('/all',authMiddleware,allowMiddleware(['superAdmin']),CollectionController.getAllCollections)
CollectionRoute.get('/enabled',CollectionController.getEnabledCollections)
CollectionRoute.get('/:id/subcollections/enabled',SubCollectionsController.getEnabled)
CollectionRoute.get('/:parentId/subcollections/enabled/:id',SubCollectionsController.getOneSubCollection)

export default CollectionRoute