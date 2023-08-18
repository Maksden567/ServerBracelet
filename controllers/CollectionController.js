import { CollectionSchema } from "../models/Collection.model.js"
import mongoose from "mongoose"
import { ProductSchema } from "../models/Product.model.js"
class CollectionController {

    async postCollection(req,res){
        const {name_ua,name_en,title_en,title_ua,enabled,media}= req.body
        const CollectionModel = mongoose.model('Collection',CollectionSchema)
        const collection = new CollectionModel({
            name_ua,
            name_en,
            title_ua,
            title_en,
            enabled,
            media
        })
        await collection.save()
        return res.json(collection)
    }
    async updateCollection(req,res){
        const {name_ua,name_en,title_en,title_ua,enabled,media}= req.body
        const {id} = req.params
        const CollectionModel = mongoose.model('Collection',CollectionSchema)
        const collection = await CollectionModel.findByIdAndUpdate(id,{
            name_ua,
            name_en,
            title_ua,
            title_en,
            enabled,
            media
        },{returnDocument:'after'})

        if(collection.enabled == false){
            const ProductModel = mongoose.model('products',ProductSchema)
            const updateItems = await ProductModel.updateMany({collection_id:collection.id},{enabled:false})
        }

        return res.json(collection)
    }

    async getAllCollections(req,res){
        const CollectionModel = mongoose.model('Collection',CollectionSchema)
        const collections = await CollectionModel.find()
        return res.json(collections)
    }

    async getEnabledCollections(req,res){
        const CollectionModel = mongoose.model('Collection',CollectionSchema)
        const collections = await CollectionModel.find({enabled:true})
        return res.json(collections)
    }

    async deleteCollection(req,res){
        const {id} = req.params
        const CollectionModel = mongoose.model('Collection',CollectionSchema)
        const item = await CollectionModel.findByIdAndDelete(id)
        res.json(item)
    }
}

export default new CollectionController