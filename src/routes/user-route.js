import express from 'express';
import { userController } from '../controllers/user-controller.js';

const router = express.Router();

/* Endpoints */
// Crear usuario
router.post('/createuser', userController.createUser);
// Editar usuario
router.put('/edituser/:id', userController.editUser);
// Ver todos los usuarios
router.get('/getallusers', userController.getAllUsers);
// Buscar usuario por id
router.get('/getuserbyid/:id', userController.getUserById);
// Eliminar usuario
router.delete('/deleteuser/:id', userController.deleteUser);
// Buscar usuario por email
router.get('/getuserbyemail/:email', userController.getUserByEmail);

export default router;