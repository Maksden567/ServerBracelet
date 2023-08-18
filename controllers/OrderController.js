import { ProductSchema } from "../models/Product.model.js"
import mongoose from "mongoose"
import { OrderSchema } from "../models/Order.model.js"
import crypto from 'crypto'
import 'dotenv/config'

class OrderController {

    async createProductOrder(req,res){

        const {orders,merchData} = req.body

        const products = await Promise.all(orders.map( async function(item){
            const ProductModel = mongoose.model('products',ProductSchema)
            const productItem =  await ProductModel.findById(item.id)
            return {productItem,quantity:item.quantity}
        }))

        const productName = await Promise.all(products.map(item=>{
            return item.productItem.name_ua
        }))

        const productPrice = await Promise.all(products.map(item=>{
            return Number(item.productItem.fullPrice) * Number(item.quantity)
        }))
        let orderReference;
        const OrderModel = mongoose.model('Orders',OrderSchema)
        const ordersDB = await OrderModel.find()
        if(ordersDB.length==0){
            orderReference=1
            const order = new OrderModel({
                orderReference
            })
            await order.save()
        }

        else{
            const lastOrder = ordersDB[ordersDB.length-1]
            orderReference=lastOrder.orderReference+1
            const order = new OrderModel({
                orderReference
            })
            await order.save()

        }
        
        const timestamp = () =>(Math.floor(new Date().getTime() / 1000))
        const count = (arr) => arr.reduce((acc, num) => acc + num, 0);

        const productCount =  await Promise.all(products.map(item=>{
           return item.quantity
        }))


        let obj = {
            merchantAccount: merchData.merchantAccount,
            merchantDomainName: merchData.merchantDomainName,
            merchantTransactionSecureType: merchData.merchantTransactionSecureType,
            authorizationType: merchData.authorizationType,
            orderReference,
            orderDate: timestamp(),
            amount: count(productPrice),
            currency: "UAH",
            productName,
            productPrice,
            productCount,
            language: "UA"
        }

        let merchantSignature = obj.merchantAccount;
        merchantSignature += `;${obj.merchantDomainName}`;
        merchantSignature += `;${obj.orderReference}`;
        merchantSignature += `;${obj.orderDate}`;
        merchantSignature += `;${obj.amount}`;
        merchantSignature += `;${obj.currency}`;
        merchantSignature += `;${obj.productName.join(";")}`;
        merchantSignature += `;${obj.productCount.join(";")}`;
        merchantSignature += `;${obj.productPrice.join(";")}`;

        const key = crypto.createHmac('MD5',process.env.SECRET_PAY_KEY).update(merchantSignature).digest("hex")
       
        obj.merchantSignature = key

        return res.json(obj)

    }


}

export default new OrderController