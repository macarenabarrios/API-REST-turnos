import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import User from '../models/user-model.js';
import Doctor from '../models/doctor-model.js';
import Appointment from '../models/appointment-model.js';

dotenv.config();

let db = {};

const dbInstance = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false,
    }
});

db.sequelize = dbInstance;
db.Sequelize = Sequelize;

db.User = User(dbInstance, Sequelize);
db.Doctor = Doctor(dbInstance, Sequelize);
db.Appointment = Appointment(dbInstance, Sequelize);

// Crea las asociaciones
db.User.associate(db);
db.Doctor.associate(db);
db.Appointment.associate(db);

export { db };