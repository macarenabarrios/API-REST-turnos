import { db } from "../db/index-db.js";

async function createDoctor(name, lastName, dateOfBirth, specialization) {
    const doctor = new db.Doctor();
    doctor.name = name;
    doctor.lastName = lastName;
    doctor.dateOfBirth = dateOfBirth;
    doctor.specialization = specialization;
    const newDoctor = await doctor.save();
    return newDoctor;
};

async function editDoctor(doctor) {
    const { id, name, lastName, dateOfBirth, specialization } = doctor;
    try {
        const doctor = await db.Doctor.findByPk(id);
        if (doctor === null || doctor.isActive === false) {
            throw new Error("Doctor not found in the database");
        }
        const doctorEdited = await db.Doctor.update(
            {
                id, name, lastName, dateOfBirth, specialization
            },
            {
                where: {
                    id: id,
                }
            });
        return doctorEdited;
    } catch (error) {
        throw new Error(error);
    }
};

async function getAllDoctors() {
    try {
        const doctors = await db.Doctor.findAll();
        const doctorsAvailable = doctors.filter(doctor => doctor.isActive === true);
        if (doctorsAvailable.length === 0) {
            throw new Error("There aren't any doctors in the database");
        }
        return doctorsAvailable;
    } catch (error) {
        throw new Error(error);
    }
};

async function getDoctorById(id) {
    try {
        const doctor = await db.Doctor.findByPk(id,
            {
                where:
                    { isActive: true }
            });
        if (doctor === null || doctor.isActive === false) {
            throw new Error("Doctor not found in the database");
        }
        return doctor;
    } catch (error) {
        console.log("Llego hasta aca");
        //return error;
        //throw new Error(error);
        throw error;
    }
};

export const doctorRepository = {
    createDoctor,
    editDoctor,
    getAllDoctors,
    getDoctorById,
};