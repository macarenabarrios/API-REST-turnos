import { db } from '../db/index-db.js';

/*
const createUser1 = async (user) => {
    return db.User.create(user);
};
*/

async function createUser(name, lastName, email, password, dateOfBirth, phone, gender, healthInsurance, bloodType) {
  const user = new db.User();
  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.password = password;
  user.dateOfBirth = dateOfBirth;
  user.phone = phone;
  user.gender = gender;
  user.healthInsurance = healthInsurance;
  user.bloodType = bloodType;
  const newUser = await user.save();
  return newUser;
};

async function deleteUser(id) {
  const user = await db.User.findOne({
    where: {
      id: id,
      isActive: true,
    }
  });
  if (user) {
    user.isActive = false;
    const deletedUser = await user.save();
    return deletedUser;
  } else {
    throw new Error("The user does not exist");
  }
};

async function editUser(user) {
  const {
    id,
    name,
    lastName,
    email,
    password,
    dateOfBirth,
    phone,
    gender,
    healthInsurance,
    bloodType
  } = user;
  try {
    const user = await db.User.findByPk(id);
    if (user === null || user.isActive === false) {
      throw new Error("User not found in the database");
    }
    const userEdited = await db.User.update(
      {
        name,
        lastName,
        email,
        password,
        dateOfBirth,
        phone,
        gender,
        healthInsurance,
        bloodType
      },
      {
        where: {
          id: id
        }
      });
    return userEdited;
  } catch (error) {
    throw new Error(error);
  }
};

async function getAllUsers() {
  try {
    const users = await db.User.findAll();
    const usersAvailable = users.filter(user => user.isActive === true);
    if (usersAvailable.length === 0) {
      throw new Error("There aren't any users in the database");
    }
    return usersAvailable;
  } catch (error) {
    throw new Error(error);
  }
};

async function getUserByEmail(email) {
  try {
    const user = await db.User.findOne({
      where: {
        email: email,
      }
    });
    if (user === null || user.isActive === false) {
      throw new Error("User not found in the database");
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

async function getUserById(id) {
  try {
    const user = await db.User.findByPk(id,
      {
        where: { isActive: true }
      });
    if (user === null || user.isActive === false) {
      throw new Error("User not found in the database");
    }
    return user;
  } catch (error) {
    //throw new Error(error);
    throw error;
    //return error;
  }
};

export const userRepository = {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
};