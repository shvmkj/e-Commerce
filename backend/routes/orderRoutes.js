import express from 'express'
import { addOrders, getAllOrders, getMyOrders, getOrderById, updateOrderToDeliver, updateOrderToPaid } from '../controllers/orderController.js'
import { isAdmin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(protect,addOrders)
router.route('/').get(protect,isAdmin,getAllOrders)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,isAdmin,updateOrderToDeliver)
export default router