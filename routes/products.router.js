import {Router} from "express";
import { getAllProducts,getProductById,deleteProductById,updateProductById,updateProductStock,createProduct } from "../controllers/products.controller.js";
import { verifyToken } from "../midlewares/verifyToken.js";
import { verifyAdmin } from "../midlewares/verifyAdmin.js";
import { validateParams } from "../midlewares/validateParams.js";
const router = Router();

//************************************ */
//         PRODUCTOS               
//************************************ */

//validar la api key para todas las rutas de productos
//router.use(validateApiKey);

//buscar todos los productos y los filtrados por  query
router.get('/products', getAllProducts);

//buscar producto por su id
router.get('/products/:id', getProductById);

//crear un nuevo producto
router.post('/products',verifyToken,verifyAdmin,createProduct);

//actualizar el campo de un producto por su id
router.patch('/products/:id', verifyToken, verifyAdmin, updateProductById);

//actualizar solo el stock de un producto 
router.patch('/products/:id/stock', verifyToken,validateParams(), verifyAdmin, updateProductStock);

//eliminar un producto por su id
router.delete('/products/:id', verifyToken , verifyAdmin, deleteProductById);


export default router;