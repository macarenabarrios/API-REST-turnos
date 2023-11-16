import express from 'express';
import { doctorController } from '../controllers/doctor-controller.js';

const router = express.Router();

router.post('/createdoctor', doctorController.createDoctor);
router.put('/editdoctor/:id', doctorController.editDoctor);
router.get('/alldoctors', doctorController.getAllDoctors);
router.get('/doctorbyid/:id', doctorController.getDoctorById);
//router.delete();

export default router;