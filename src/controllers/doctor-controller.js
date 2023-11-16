import { doctorService } from '../services/doctor-service.js';

async function createDoctor(req, res, next) {
    const { name, lastName, dateOfBirth, specialization } = req.body;
    try {
        const doctor = await doctorService.createDoctor(name, lastName, dateOfBirth, specialization);
        return res.status(201).json(doctor);
    } catch (error) {
        next(error);
    }
};

async function editDoctor(req, res, next) {
    const { id } = req.params;
    const { name, lastName, dateOfBirth, specialization } = req.body;
    try {
        const doctor = await doctorService.editDoctor(id, name, lastName, dateOfBirth, specialization);
        return res.status(201).json(doctor);
    } catch (error) {
        next(error);
    }
};

async function getAllDoctors(req, res, next) {
    try {
        const doctor = await doctorService.getAllDoctors();
        return res.status(200).json(doctor);
    } catch (error) {
        next(error);
    }
};

async function getDoctorById(req, res, next) {
    const { id } = req.params;
    try {
        const doctor = await doctorService.getDoctorById(id);
        return res.status(200).json(doctor);
    } catch (error) {
        next(error);
    }
};

export const doctorController = {
    createDoctor,
    editDoctor,
    getAllDoctors,
    getDoctorById,
};