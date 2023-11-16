import { DataTypes } from 'sequelize';

const User = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        role: {
            type: DataTypes.ENUM(['ADMIN', 'PATIENT']),
            defaultValue: 'PATIENT',
        },
        dateOfBirth: {
            type: DataTypes.DATE,
        },
        phone: {
            type: DataTypes.INTEGER,
        },
        gender: {
            type: DataTypes.ENUM(['FEMALE', 'MALE', 'OTHER']),
        },
        healthInsurance: {
            type: DataTypes.ENUM(['OSDE', 'SANCOR', 'SWISS MEDICAL', 'GALENO', 'OMINT', 'MEDIFE', 'OTHER']),
        },
        bloodType: {
            type: DataTypes.ENUM(['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-']),
        },
        password: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, { timestamps: true });

    // Define association here
    User.associate = function (models) {
        // One user has many appointments
        User.hasMany(models.Appointment, {
            foreignKey: 'userId',
            as: 'userAppointments',
        });
    };
    return User;
};

export default User;