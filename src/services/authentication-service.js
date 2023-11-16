import jwt from 'jsonwebtoken';
import ApiError from '../errors/api-error.js';
import { userService } from './user-service.js';

export const authentication = async (email, password) => {
    try {
        const res = await userService.getUserByEmailAndPassword(email, password);
        if (!res) throw new ApiError(500, "Nothing was found in the DB");
        if (!res.isActive) throw new ApiError(401, "Please confirm your email address to continue!");
        const token = jwt.sign(res, process.env.JWT_KET, { expiresIn: "1h" });
        return token;
    } catch (error) {
        throw new Error(error);
    };
};
