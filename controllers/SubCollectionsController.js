import mongoose from "mongoose";
import { SubCollectionSchema } from "../models/SubCollection.js";


class SubCollectionsController{
    async createSubCollection(req,res){
        const {parent_id,name_ua,name_en,title_ua,title_en,enabled,media} = req.body
        if(!name_en||!name_ua||!title_en||!title_ua||!parent_id){
            return res.status(403).json('Недостатньо обовязкових параметрів')
        }
        const SubCollectionModel = mongoose.model('SubCollections',SubCollectionSchema)
        const subcollection = new SubCollectionModel({
            parent_id,
            name_en,
            name_ua,
            title_en,
            title_ua,
            media,
            enabled
        })
        await subcollection.save()
        if(!subcollection){
            return res.json('ошибка создания')
        }
        return res.json('Підколекція успішно создана')
        
    }

    async getAll (req,res){
        const SubCollectionModel = mongoose.model('SubCollections',SubCollectionSchema)
        const subcollections = await SubCollectionModel.find()
        return res.json(subcollections)
    }

    async getEnabled(req,res){
        const {id} = req.params
        const SubCollectionModel = mongoose.model('SubCollections',SubCollectionSchema)
        let subcollections = await SubCollectionModel.find({enabled:true})
        subcollections = subcollections.filter(item=>item.parent_id==id)
        return res.json(subcollections)
    }

    async getOneSubCollection(req,res){
        const {parentId,id} = req.params
        const SubCollectionModel = mongoose.model('SubCollections',SubCollectionSchema)
        const subcollections = await SubCollectionModel.find({parent_id:parentId})
        const subcollection = subcollections.find(item=>item._id=id)
        return res.json(subcollection)
         

    }

    async updateSubCollections (req,res){
        const {parent_id,name_ua,name_en,title_ua,title_en,enabled,media} = req.body
        const {id} = req.params
        if(!name_en||!name_ua||!title_en||!title_ua||!parent_id){
            return res.status(403).json('Недостатньо обовязкових параметрів')
        }
        const SubCollectionModel = mongoose.model('SubCollections',SubCollectionSchema)
        const subcollection = await SubCollectionModel.findByIdAndUpdate(id,{
            parent_id,
            name_en,
            name_ua,
            title_en,
            title_ua,
            media,
            enabled
        },{returnDocument:'after'})

        return res.json(subcollection)
    }

    async getEnabledSubCollections (req,res){
        const SubCollectionModel = mongoose.model('SubCollections',SubCollectionSchema)
        const subcollections = await SubCollectionModel.find({enabled:true})
        return res.json(subcollections)
    }

    async deleteOne(req,res){
        const {id}  = req.params
        const SubCollectionModel = mongoose.model('SubCollections',SubCollectionSchema)
        const subcollection = await SubCollectionModel.findByIdAndDelete(id)
        return res.json('Delete product')
    }
}

export default new SubCollectionsController