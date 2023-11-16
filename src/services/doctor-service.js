import { doctorRepository } from "../repositories/doctor-repository.js";

async function createDoctor(name, lastName, dateOfBirth, specialization) {
    return await doctorRepository.createDoctor(name, lastName, dateOfBirth, specialization);
};

async function editDoctor(id, name, lastName, dateOfBirth, specialization) {
    return await doctorRepository.editDoctor({ id, name, lastName, dateOfBirth, specialization });
};

async function getAllDoctors() {
    return await doctorRepository.getAllDoctors();
};

async function getDoctorById(id) {
    return await doctorRepository.getDoctorById(id);
};

export const doctorService = {
    createDoctor,
    editDoctor,
    getAllDoctors,
    getDoctorById,
};