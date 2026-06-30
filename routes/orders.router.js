import {Router} from "express";
import { getMyOrders, getAllOrders,getOrderById,deleteOrderById,updateOrderById, updateOrderStatus, createOrder } from "../controllers/orders.controllers.js";
import { verifyToken } from "../midlewares/verifyToken.js";
import { verifyAdmin } from "../midlewares/verifyAdmin.js";
const router = Router();
import { validateSearch } from "../midlewares/validateSearch.js";
import { validateBody } from "../midlewares/validateBody.js";
import { getOrdersSchema,orderIdSchema,createOrderSchema,updateOrderSchema } from "../schemas/order.schemas.js";

//************************************ */
//              Ordenes                
//************************************ */

//buscar todas las ordenes y las filtradas por su campo (admin)
router.get('/orders',verifyToken,verifyAdmin,validateSearch(getOrdersSchema), getAllOrders);

//buscar las ordenes del usuario autenticado
router.get('/orders/my-orders', verifyToken, getMyOrders);

//buscar ordenes por su id
router.get('/orders/:id',verifyToken,validateSearch(orderIdSchema), getOrderById);

//crear una nueva orden
router.post('/orders', verifyToken,validateBody(createOrderSchema), createOrder);

//actualizar ordenes por su id
router.patch('/orders/:id',verifyToken, verifyAdmin,validateBody(updateOrderSchema), updateOrderById);

//actualizar solo el estado de la orden
router.patch('/orders/:id/status', verifyToken, verifyAdmin, validateBody(updateOrderSchema), updateOrderStatus);


//eliminar orden por id
router.delete('/orders/:id',verifyToken, verifyAdmin,validateBody(orderIdSchema), deleteOrderById);


export default router