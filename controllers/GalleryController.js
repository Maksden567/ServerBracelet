import { GallerySchema } from '../models/GalleryModel.js'
import mongoose from 'mongoose'




class GalleryController {
    async createGallery(req,res){
        const {name_ua,name_en,title_en,title_ua,images,media,enabled}=req.body
        if(!name_ua||!name_en||!title_en||!title_ua||!images||!media){
            return res.status(403).json('Не відправлені всі обовязкові поля')
        }
        const GalleryModel=mongoose.model('GalleryModel',GallerySchema)

        const gallery=new GalleryModel({
            name_en,
            name_ua,
            title_en,
            title_ua,
            images,
            media,
            enabled
        })
        await gallery.save()
        return res.json(gallery)

    }
    async getAll(req,res){
        const GalleryModel=mongoose.model('GalleryModel',GallerySchema)
        const galleries=await GalleryModel.find()
        return res.json(galleries)
    }
    async getEnabled(req,res){
        const GalleryModel=mongoose.model('GalleryModel',GallerySchema)
        const galleries=await GalleryModel.find({enabled:true})
        const galleryisFilter =  galleries.map(item=>{
            const galleryFilter=item.images.filter(item1=>item1.enabled==true)
            item.images=galleryFilter
            return item
        })
        return res.json(galleryisFilter)
    }
    async updateGallery(req,res){
        const {name_ua,name_en,title_en,title_ua,images,media,enabled}=req.body
        const {id}=req.params
        const GalleryModel=mongoose.model('GalleryModel',GallerySchema)
        const galleries=await GalleryModel.findByIdAndUpdate(id,{
            name_en,
            name_ua,
            title_en,
            title_ua,
            images,
            media,
            enabled
        },{returnDocument:'after'})
        return res.json(galleries)
    }
    async updateGalleryImg(req,res){
        const {name_ua,name_en,title_en,title_ua,images,media,enabled}=req.body
        const {id}=req.params
        const GalleryModel=mongoose.model('GalleryModel',GallerySchema)
        const galleries=await GalleryModel.findByIdAndUpdate(id,{
            name_en,
            name_ua,
            title_en,
            title_ua,
            images,
            media,
            enabled
        },{returnDocument:'after'})
        return res.json(galleries)
    }
    async updateGalleryImg(req,res){
        const {link,enabled}=req.body
        const {id,imgID}=req.params
        const GalleryModel=mongoose.model('GalleryModel',GallerySchema)
        const gallery=await GalleryModel.findById(id)
       
        const galleryFind = gallery.images.find(item=>item._id==imgID)
        galleryFind.enabled=enabled
        galleryFind.link=link
        await gallery.save()
        return res.json(gallery)
    }
    async delete(req,res){
        const {id}=req.params
        const GalleryModel=mongoose.model('GalleryModel',GallerySchema)
        const gallery=await GalleryModel.findByIdAndDelete(id)
        return res.json(gallery)
    }
}

export default new GalleryController