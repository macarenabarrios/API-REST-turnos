import express from 'express';
import { appointmentController } from '../controllers/appointment-controller.js';

const router = express.Router();

/* Endpoints */
// Crear cita
router.post('/createappointment', appointmentController.createAppointment);
// Editar cita
router.put('/editappointment/:id', appointmentController.editAppointment);
// Ver todas las citas
router.get('/allappointments', appointmentController.getAllAppointments);
// Buscar cita por id
router.get('/appointmentbyid/:id', appointmentController.getAppointmentById);
// Buscar cita(s) por doctor
router.get('/appointmentbydoctor/:id', appointmentController.getAppointmentsByDoctor);
// Buscar cita(s) por paciente
router.get('/appointmentbyuser/:id', appointmentController.getAppointmentsByUser);
// Eliminar cita
router.delete('/deleteappointment/:id', appointmentController.deleteAppointment);

export default router;