import { Router } from 'express';
import { getAllCategories, getCategoryById, deleteCategoryById, updateCategoryById, createCategory } from '../controllers/categories.controller.js';
import { verifyToken } from '../midlewares/verifyToken.js';
import { verifyAdmin } from '../midlewares/verifyAdmin.js';
const router = Router();

//************************************ */
//       RUTAS DE CATEGORIAS               
//************************************ */

// Buscar todas las categorias y las filtradas por query
router.get('/categories', getAllCategories);

// Buscar categoria por su id
router.get('/categories/:id', getCategoryById);

// Crear una nueva categoria
router.post('/categories', verifyToken, verifyAdmin, createCategory);

// Actualizar categoria por su id
router.patch('/categories/:id', verifyToken, verifyAdmin, updateCategoryById);

// Eliminar categoria por su id
router.delete('/categories/:id', verifyToken, verifyAdmin, deleteCategoryById);

export default router