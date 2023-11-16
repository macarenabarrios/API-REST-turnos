import { userService } from '../services/user-service.js';

async function createUser(req, res, next) {
    const { name, lastName, email, password, dateOfBirth, phone, gender, healthInsurance, bloodType } = req.body;
    try {
        const user = await userService.createUser(name, lastName, email, password, dateOfBirth, phone, gender, healthInsurance, bloodType);
        return res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

async function deleteUser(req, res, next) {
    const { id } = req.params;
    try {
        await userService.deleteUser(id);
        res.status(201).send(`User with id ${id} successfully deleted`);
    } catch (error) {
        next(error);
    }
};

async function editUser(req, res, next) {
    const { id } = req.params;
    const { name, lastName, email, password, dateOfBirth, phone, gender, healthInsurance, bloodType } = req.body;
    try {
        const user = await userService.editUser(id, name, lastName, email, password, dateOfBirth, phone, gender, healthInsurance, bloodType);
        return res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

async function getAllUsers(req, res, next) {
    try {
        const user = await userService.getAllUsers();
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

async function getUserByEmail(req, res, next) {
    const { email } = req.params;
    try {
        const user = await userService.getUserByEmail(email);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

async function getUserById(req, res, next) {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const userController = {
    createUser,
    deleteUser,
    editUser,
    getAllUsers,
    getUserByEmail,
    getUserById
};