import express from 'express';
const router = express.Router();

import authenticationRouter from './authentication-route.js';
import userRouter from './user-route.js';
import doctorRouter from './doctor-route.js'
import appointmentRouter from './appointment-route.js';

// Paths a las distintas rutas
router.use('/login', authenticationRouter);
router.use('/user', userRouter);
router.use('/doctor', doctorRouter);
router.use('/appointment', appointmentRouter);

export default router;