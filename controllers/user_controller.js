const { User } = require("../models");
const { crtUser, updUser, delUser } = require("../helper/validation");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      repeat_password,
      no_phone,
      birth_place,
      birth_date,
    } = req.body;

    const isExisting = await User.findOne({
      where: { email: email },
    });

    if (isExisting) {
      return res.status(409).json({
        code: 409,
        statusText: "Conflict",
        success: false,
        message: "User data with same email already exist.",
      });
    }

    const mdyFormat = birth_date.match(/\d{2,4}/g),
      dd = mdyFormat[0],
      mm = mdyFormat[1],
      yyyy = mdyFormat[2],
      mdyDateFormat = `${mm}-${dd}-${yyyy}`;

    await crtUser.validateAsync({
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: password,
      repeat_password: repeat_password,
      no_phone: no_phone,
      birth_place: birth_place,
      birth_date: mdyDateFormat,
    });
    await User.create({
      first_name,
      last_name,
      username,
      email,
      password: bcrypt.hashSync(password, 12),
      no_phone,
      birth_place,
      birth_date: String(new Date(mdyDateFormat)),
    });

    const userData = await User.findOne({
      where: { email: email },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "no_phone"],
      },
    });

    return res.status(201).json({
      code: 201,
      statustext: "Created",
      success: true,
      message: "New user data has been created",
      result: userData,
    });
  } catch (err) {
    console.log(err);
    if (err.isJoi === true) {
      res.status(422).json({
        code: 422,
        statustext: "Unprocessable Entity",
        success: false,
        message: err.message,
      });
    } else {
      res.status(400).json({
        code: 400,
        statustext: "Bad Request",
        success: false,
        message: "Failed to create a new user data",
      });
    }
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const getAllUsers = await User.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "no_phone"],
      },
    });
    return res.status(200).json({
      code: 200,
      statusText: "OK",
      success: true,
      message: `Successfully get all user data`,
      result: getAllUsers,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      statusText: "Internal Server Error",
      success: false,
      message: "Cannot get data",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const getUser = await User.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    return res.status(200).json({
      code: 200,
      statusText: "OK",
      success: true,
      message: `Successfully get a user data`,
      result: getUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      statusText: "Internal Server Error",
      success: false,
      message: "Cannot get data",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      repeat_password,
      no_phone,
      birth_place,
      birth_date,
    } = req.body;

    const previousData = await User.findOne({
      where: { id: req.params.id },
    });

    const mdyFormat = birth_date.match(/\d{2,4}/g),
      dd = mdyFormat[0],
      mm = mdyFormat[1],
      yyyy = mdyFormat[2],
      mdyDateFormat = `${mm}-${dd}-${yyyy}`;

    await updUser.validateAsync({
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: password,
      repeat_password: repeat_password,
      no_phone: no_phone,
      birth_place: birth_place,
      birth_date: mdyDateFormat,
    });
    if (!password) {
      await User.update(
        {
          first_name,
          last_name,
          username,
          email,
          password: previousData.dataValues.password,
          no_phone,
          birth_place,
          birth_date: String(new Date(mdyDateFormat)),
        },
        {
          where: {
            id: req.params.id,
            email: email,
          },
        }
      );
    }

    if (password) {
      await User.update(
        {
          first_name,
          last_name,
          username,
          email,
          password: bcrypt.hashSync(password, 12),
          no_phone,
          birth_place,
          birth_date: String(new Date(mdyDateFormat)),
        },
        {
          where: {
            id: req.params.id,
            email: email,
          },
        }
      );
    }
    const userData = await User.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "no_phone"],
      },
    });
    return res.status(200).json({
      code: 200,
      statusText: "OK",
      success: true,
      message: `Successfully update a user data with ID ${userData.dataValues.id}`,
      result: userData,
    });
  } catch (err) {
    console.log(err);
    if (err.isJoi === true) {
      res.status(422).json({
        code: 422,
        statustext: "Unprocessable Entity",
        success: false,
        message: err.message,
      });
    } else {
      console.log(err);
      res.status(500).json({
        code: 500,
        statustext: "Internal Server Error",
        success: false,
        message: "failed to get the data",
      });
    }
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const password = req.body.password,
      id = req.params.id;
    const userData = await User.findOne({ where: { id: req.params.id } });

    if (!userData) {
      return res.status(409).json({
        Code: 409,
        statustext: "Conflict",
        success: false,
        message: `User data with ID ${id} is not exist in database`,
      });
    }

    await delUser.validateAsync({ ...req.body });

    const verifyPassword = await bcrypt.compare(
      password,
      userData.dataValues.password
    );

    // if password doesn't match
    if (!verifyPassword) {
      return res.status(401).json({
        Code: 401,
        statustext: "Unauthorized",
        success: false,
        message: "Wrong Password, please try again",
      });
    }
    await User.destroy({
      where: {
        id: id,
        password: userData.dataValues.password,
      },
    });
    return res.status(200).json({
      code: 200,
      statusText: "OK",
      success: true,
      message: `Successfully deleted a user data with name ${userData.dataValues.first_name} and ID ${userData.dataValues.id}`,
    });
  } catch (err) {
    console.log(err);
    if (err.isJoi === true) {
      res.status(422).json({
        code: 422,
        statustext: "Unprocessable Entity",
        success: false,
        message: err.message,
      });
    } else {
      console.log(err);
      res.status(500).json({
        code: 500,
        statustext: "Internal Server Error",
        success: false,
        message: "Failed to get the data",
      });
    }
  }
};
