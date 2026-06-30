import { Router } from 'express';
import { 
    getAllUsers, 
    getUserById, 
    deleteUserById, 
    updateUserById, 
    createUser,
    getMyProfile,      
    updateMyProfile,   
    changePassword     
} from '../controllers/users.controller.js';
import { verifyToken } from "../midlewares/verifyToken.js";
import { verifyAdmin } from "../midlewares/verifyAdmin.js";
import { validateSearch } from '../midlewares/validateSearch.js';
import { validateBody } from '../midlewares/validateBody.js';
import { getUsersSchema, userIdSchema, createUserSchema, updateUserSchema, changePasswordSchema } from '../schemas/user.schemas.js';
const router = Router();

//************************************ */
//         RUTAS DE USUARIOS               
//************************************ */

// Buscar todos los usuarios y los filtrados por sus campos (solo admin)
router.get('/users',verifyToken, verifyAdmin,validateSearch(getUsersSchema), getAllUsers);

// Obtener el perfil del usuario autenticado
router.get('/users/me', verifyToken, getMyProfile);

// Actualizar el perfil del usuario autenticado
router.patch('/users/me', verifyToken, validateBody(updateUserSchema), updateMyProfile);

// Cambiar contraseña del usuario autenticado
router.patch('/users/me/password', verifyToken, validateBody(changePasswordSchema), changePassword);

// Buscar usuario por su id (admin o el propio usuario, validar en el controller)
router.get('/users/:id', verifyToken,validateSearch(userIdSchema), getUserById);

// Crear un nuevo usuario (admin)
router.post('/users', verifyToken, verifyAdmin, validateBody(createUserSchema), createUser);

// Actualizar usuario por su id (admin)
router.patch('/users/:id', verifyToken, verifyAdmin,validateBody(updateUserSchema), updateUserById);

// Eliminar usuario por id
router.delete('/users/:id', verifyToken, verifyAdmin,validateBody(userIdSchema), deleteUserById);

export default router