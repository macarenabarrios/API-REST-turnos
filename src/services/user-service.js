import { userRepository } from '../repositories/user-repository.js';
import { PasswordUtil } from '../utils/password-util.js';

/* const createUser1 = async (user) => {
    return await userRepository.createUser(user);
}; */

async function createUser(name, lastName, email, password, dateOfBirth, phone, gender, healthInsurance, bloodType) {
    const hashedPassword = await PasswordUtil.hashPassword(password);
    password = hashedPassword;
    return await userRepository.createUser(name, lastName, email, password, dateOfBirth, phone, gender, healthInsurance, bloodType);
};

async function deleteUser(id) {
    return await userRepository.deleteUser(id);
};

async function editUser(id, name, lastName, email, password, dateOfBirth, phone, gender, healthInsurance, bloodType) {
    return await userRepository.editUser({ id, name, lastName, email, password, dateOfBirth, phone, gender, healthInsurance, bloodType });
};

async function getAllUsers() {
    return await userRepository.getAllUsers();
};

async function getUserByEmail(email) {
    return await userRepository.getUserByEmail(email);
};

async function getUserByEmailAndPassword(email, password) {
    const user = await userRepository.getUserByEmail(email);
    if (!user) throw new ApiError(400, `User not found with email ${email}`);
    const isPasswordValid = await PasswordUtil.comparePasswords(password, user.password);
    if (isPasswordValid) return user;
};

async function getUserById(id) {
    return await userRepository.getUserById(id);
};

export const userService = {
    createUser,
    deleteUser,
    editUser,
    getAllUsers,
    getUserByEmail,
    getUserByEmailAndPassword,
    getUserById,
};