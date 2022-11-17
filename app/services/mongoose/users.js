const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");
const { BadRequestError } = require("../../errors");

const createOrganizer = async (req) => {
  const { organizer, role, email, password, confrimPassword, name } = req.body;

  if (password != confrimPassword) {
    throw new BadRequestError("Password dan konfirmasi password tidak cocok");
  }

  const result = await Organizers.create({ organizer });

  const users = await Users.create({
    email,
    name,
    password,
    organizer: result._id,
    role,
  });

  delete users._doc.password;

  return users;
};

const createUsers = async (req, res) => {
  const { name, password, role, confrimPassword, email } = req.body;

  if (password !== confrimPassword) {
    throw new BadRequestError("Password dan konfirmasi password tidak cocok");
  }

  const result = await Users.create({
    name,
    email,
    organizer: req.user.organizer,
    password,
    role,
  });

  return result;
};

const getAllUsers = async (req) => {
  const result = await Users.find();
  return result;
};

module.exports = { createOrganizer, createUsers, getAllUsers };
