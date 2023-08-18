import { Router } from "express";
import OrderController from "../controllers/OrderController.js";

const OrderRouter = Router()


OrderRouter.post('/createOrder', OrderController.createProductOrder)

export default OrderRouter