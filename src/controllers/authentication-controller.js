import { authentication } from '../services/authentication-service.js';

async function login(req, res, next) {
    const { email, password } = req.body;
    authentication(email, password)
        .then((result) => {
            res.status(200).json({ JWT: result, info: { email } });
        })
        .catch((error) => {
            next(error);
        });
};

export { login };