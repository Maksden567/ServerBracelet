import { CategorySchema } from "../models/Category.model.js"
import { ProductSchema } from "../models/Product.model.js"
import mongoose from "mongoose"

class CategoryControler {

    async postCategory(req,res){
        const {name_ua,name_en,title_en,title_ua,enabled,media}= req.body
        const CategoriesModel = mongoose.model('Categories',CategorySchema)
        const category = new CategoriesModel({
            name_ua,
            name_en,
            title_ua,
            title_en,
            enabled,
            media
        })
        await category.save()
        return res.json(category)
    }
    async updateCategory(req,res){
        const {name_ua,name_en,title_en,title_ua,enabled,media}= req.body
        const {id} = req.params
        const CategoriesModel = mongoose.model('Categories',CategorySchema)
      
        const category = await CategoriesModel.findByIdAndUpdate(id,{
            name_ua,
            name_en,
            title_ua,
            title_en,
            enabled,
            media
        },{returnDocument:'after'})

       
        if(category.enabled == false){
            const ProductModel = mongoose.model('products',ProductSchema)
            const updateItems = await ProductModel.updateMany({category_id:category.id},{enabled:false})
        }

        return res.json(category)
    }

    async getAllCategories(req,res){
        const CategoriesModel = mongoose.model('Categories',CategorySchema)
        const categories = await CategoriesModel.find()
        return res.json(categories)
    }

    async getEnableCategories(req,res){
        const CategoriesModel = mongoose.model('Categories',CategorySchema)
        const categories = await CategoriesModel.find({enabled:true})
        return res.json(categories)
    }
}

export default new CategoryControler