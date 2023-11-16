import { DataTypes } from 'sequelize';

const Doctor = (sequelize, Sequelize) => {
    const Doctor = sequelize.define("doctors", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateOfBirth: {
            type: DataTypes.DATE,
        },
        specialization: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, { timestamps: true });

    // Define association here

    // One doctor has many appointments
    Doctor.associate = function (models) {
        Doctor.hasMany(models.Appointment, {
            foreignKey: 'doctorId',
            as: 'doctorAppointments',
        });
    }
    return Doctor;
};

export default Doctor;