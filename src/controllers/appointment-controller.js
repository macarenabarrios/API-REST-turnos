import { appointmentService } from '../services/appointment-service.js';

// Crear cita
async function createAppointment(req, res, next) {
  const { userId, doctorId, dateOfAppointment, notes } = req.body;
  try {
    const appointment = await appointmentService.createAppointment(userId, doctorId, dateOfAppointment, notes);
    return res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

// Editar cita
async function editAppointment(req, res, next) {
  const { id } = req.params;
  const { userId, doctorId, dateOfAppointment, notes } = req.body;
  try {
    const appointment = await appointmentService.editAppointment(id, userId, doctorId, dateOfAppointment, notes);
    return res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

// Ver todas las citas
async function getAllAppointments(req, res, next) {
  try {
    const appointment = await appointmentService.getAllAppointments();
    return res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};

// Buscar cita por id
async function getAppointmentById(req, res, next) {
  const { id } = req.params;
  try {
    const appointment = await appointmentService.getAppointmentById(id);
    return res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};

// Eliminar cita
async function deleteAppointment(req, res, next) {

};

// Buscar cita(s) por doctor
async function getAppointmentsByDoctor(req, res, next) {

};

// Buscar cita(s) por paciente
async function getAppointmentsByUser(req, res, next) {

};


export const appointmentController = {
  createAppointment,
  deleteAppointment,
  editAppointment,
  getAllAppointments,
  getAppointmentsByDoctor,
  getAppointmentById,
  getAppointmentsByUser
};