import { Router } from "express";
import GalleryController from "../controllers/GalleryController.js";
import {authMiddleware} from '../middleware/authMiddleware.js'
import {allowMiddleware} from '../middleware/allowMiddleware.js'

const GalleryRoute=Router()

GalleryRoute.post('/create',authMiddleware,allowMiddleware(['superAdmin']),GalleryController.createGallery)
GalleryRoute.get('/all',authMiddleware,allowMiddleware(['superAdmin']),GalleryController.getAll)
GalleryRoute.get('/enabled',GalleryController.getEnabled)
GalleryRoute.put('/update/:id',authMiddleware,allowMiddleware(['superAdmin']),GalleryController.updateGallery)
GalleryRoute.put('/update/:id/:imgID',authMiddleware,allowMiddleware(['superAdmin']),GalleryController.updateGalleryImg)
GalleryRoute.delete('/delete/:id/',authMiddleware,allowMiddleware(['superAdmin']),GalleryController.delete)

export default GalleryRoute