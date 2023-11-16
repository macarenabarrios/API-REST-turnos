import { appointmentRepository } from '../repositories/appointment-repository.js';
import { userRepository } from '../repositories/user-repository.js';
import { doctorRepository } from '../repositories/doctor-repository.js';
import { db } from "../db/index-db.js";

async function createAppointment(userId, doctorId, dateOfAppointment, notes) {
    // Tengo que buscar el doctor y el usuario en la BD
    /*     try {
            const patient = userRepository.getUserById(userId);
            if (!patient) throw new Error("The patient doesn't exist");
            const doctor = doctorRepository.getDoctorById(doctorId);
            if (!doctor) throw new Error("The doctor doesn't exist");
            return await appointmentRepository.createAppointment(userId, doctorId, dateOfAppointment, notes);
        } catch (error) {
            return error;
            //throw new Error(error);
            //throw error;
        } */
    const patient = await db.User.findOne({
        where: {
            id: userId,
            isActive: true,
        }
    });
    const doctor = await db.Doctor.findOne({
        where: {
            id: doctorId,
            isActive: true,
        }
    });
    if (!patient) throw new Error(`Cita no creada, paciente con id ${userId} inexistente`);
    if (!doctor) throw new Error(`Cita no creada, doctor con id ${doctorId} inexistente`);
    return await appointmentRepository.createAppointment(userId, doctorId, dateOfAppointment, notes);
};

async function editAppointment(id, userId, doctorId, dateOfAppointment, notes) {
    return await appointmentRepository.editAppointment({ id, userId, doctorId, dateOfAppointment, notes });
};

async function getAllAppointments() {
    return await appointmentRepository.getAllAppointments();
};

async function getAppointmentById(id) {
    return await appointmentRepository.getAppointmentById(id);
};

export const appointmentService = {
    createAppointment,
    editAppointment,
    getAllAppointments,
    getAppointmentById
};