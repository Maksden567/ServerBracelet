import {ProductSchema} from '../models/Product.model.js'
import mongoose from 'mongoose'
import CollectionController from './CollectionController.js'
import CategoryController from './CategoryController.js'

class ProductController{
    
    async getAllProduct(req,res){

        const ProductModel = mongoose.model('products',ProductSchema)
        const products = await ProductModel.find()
        res.json(products)

    }

    async getEnableProduct(req,res){
        const ProductModel = mongoose.model('products',ProductSchema)
        
        const products = await ProductModel.find({enabled:true})


       
        res.json(products)
    }

    async createProduct(req,res){

        const {name_ua,name_en,fullPrice,article,collection_id,category_id,size,description_ua,description_en,media,recommended,enabled}=req.body
        if(!name_en||name_ua||!fullPrice||!media||!article||!collection_id||!category_id||!description_en||!description_ua||!media||!recommended){
            return res.status(403).json('Недостатньо обовязкових параметрів')
        }
        const ProductModel = mongoose.model('products',ProductSchema)
        const product = new ProductModel({
            name_ua,
            name_en,
            fullPrice,
            article,
            collection_id,
            category_id,
            size,
            description_en,
            description_ua,
            media,
            enabled,
            recommended
        })

        await product.save()

        res.json(product)


    }

    async updateProduct(req,res){
        const {name_ua,name_en,fullPrice,article,collection_id,category_id,size,description_ua,description_en,media,recommended,enabled}=req.body
        if(!name_en||name_ua||!fullPrice||!media||!article||!collection_id||!category_id||!description_en||!description_ua||!media||!recommended){
            return res.status(403).json('Недостатньо обовязкових параметрів')
        }
        const {id} = req.params
        const ProductModel = mongoose.model('products',ProductSchema)
        const product =await ProductModel.findByIdAndUpdate(id,{
            name_ua,
            name_en,
            fullPrice,
            article,
            collection_id,
            category_id,
            size,
            description_en,
            description_ua,
            media,
            enabled,
            recommended
        },{returnDocument:'after'})

        if(!product){
            return res.status(403).json('Продукта з таким id немає')
        }
        res.json(product)

    }

    async productDelete(req,res){
        const {id} = req.params
        const ProductModel = mongoose.model('products',ProductSchema)
        const item = await ProductModel.findByIdAndDelete(id)
        res.json(item)
    }
}

export default new ProductController