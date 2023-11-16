import { DataTypes } from "sequelize";

const Appointment = (sequelize, Sequelize) => {
    const Appointment = sequelize.define("appointments", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        dateOfAppointment: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        notes: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, { timestamps: true });

    // Define association here
    Appointment.associate = function (models) {
        // One appointments belongs to one user
        Appointment.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'patientName',
        });

        Appointment.belongsTo(models.Doctor, {
            foreignKey: 'doctorId',
            as: 'doctorName',
        });
    };
    return Appointment;
};

export default Appointment;