import {ProductSchema} from '../models/Product.model.js'
import mongoose from 'mongoose'

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
        const ProductModel = mongoose.model('products',ProductSchema)
        const product = new ProductModel({
            name_ua,
            name_en,
            fullPrice,
            article,
            category_id,
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
        const {id} = req.params
        const ProductModel = mongoose.model('products',ProductSchema)
        const product =await ProductModel.findByIdAndUpdate(id,{
            name_ua,
            name_en,
            fullPrice,
            article,
            category_id,
            category_id,
            size,
            description_en,
            description_ua,
            media,
            enabled,
            recommended
        },{returnDocument:'after'})

        res.json(product)

    }
}

export default new ProductController