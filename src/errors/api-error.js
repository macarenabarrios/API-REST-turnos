import { errorMessages } from '../controllers/response-message.js';

export default class ApiError extends Error {
    constructor(errorCode, message) {
        super(message);
        this.message = this.setMessage(message, errorCode);
        this.errorCode = errorCode;
    }

    setMessage(message, errorCode) {
        if (message) return message;
        switch (errorCode) {
            case 400:
                return errorMessages.NOT_FOUND;
            case 401:
                return "No autorizado";
            case 403:
                return "Prohibido";
            case 404:
                return "No encontrado";
            case 500:
                return errorMessages.INTERNAL_SERVER_ERROR;
            default:
                return "Untracked Error";
        }

    }
};
