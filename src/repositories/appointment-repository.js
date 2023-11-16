import { db } from '../db/index-db.js';

async function createAppointment(userId, doctorId, dateOfAppointment, notes) {
    const appointment = new db.Appointment();
    appointment.userId = userId;
    appointment.doctorId = doctorId;
    appointment.dateOfAppointment = dateOfAppointment;
    appointment.notes = notes;
    const newAppointment = await appointment.save();
    return newAppointment;
};

async function editAppointment(appointment) {
    const { id, userId, doctorId, dateOfAppointment, notes } = appointment;
    try {
        const appointment = await db.Appointment.findByPk(id);
        if (appointment === null || appointment.isActive === false) {
            throw new Error("Appointment not found in the database");
        }
        const appointmentEdited = await db.Appointment.update(
            {
                userId, doctorId, dateOfAppointment, notes
            },
            {
                where: {
                    id: id
                }
            });
        return appointmentEdited;
    } catch (error) {
        throw new Error(error);
    }
};

async function getAllAppointments() {
    try {
        const appointments = await db.Appointment.findAll();
        const appointmentAvailable = appointments.filter(appointment => appointment.isActive === true);
        if (appointmentAvailable.length === 0) {
            throw new Error("There aren't any appointments in the database");
        }
        return appointmentAvailable;
    } catch (error) {
        throw new Error(error);
    }
};

async function getAppointmentById(id) {
    try {
        const appointment = await db.Appointment.findByPk(id);
        if (appointment === null || appointment.isActive === false) {
            throw new Error("Appointment not found in the database");
        }
        return appointment;
    } catch (error) {
        throw new Error(error);
    }
};

export const appointmentRepository = {
    createAppointment,
    editAppointment,
    getAllAppointments,
    getAppointmentById
};