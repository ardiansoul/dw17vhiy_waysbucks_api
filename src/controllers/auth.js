const { User } = require("../../models");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validationForm");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) {
      console.error(error);
      return res.status(400).send({
        status: "Error",
        message: error.details[0].message,
      });
    }

    const userExist = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userExist) {
      return res.status(400).send({
        status: "Error",
        message: "Invalid Login",
      });
    }

    const validPass = await bcrypt.compare(
      req.body.password,
      userExist.password
    );

    if (!validPass) {
      return res.status(400).send({
        status: "Error",
        message: "Invalid Login",
      });
    }

    const token = jwt.sign(
      {
        id: userExist.id,
      },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({
      email: userExist.email,
      role: userExist.role,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

const register = async (req, res, next) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) {
      console.error(error);
      return res.status(400).send({
        status: "Error",
        message: error.details[0].message,
      });
    }

    const userExist = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExist) {
      console.error(error);
      return res.status(400).send({
        status: "Error",
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const createData = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: createData.id,
      },
      process.env.JWT_SECRET_KEY
    );

    console.log(createData);
    res.status(201).json({
      status: "Success",
      data: {
        email: createData.email,
        role: createData.role,
        token,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

const checkAuth = async (req, res, next) => {
  try {
    const { id } = req.user;

    const getUser = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["fullName", "password", "createdAt", "updatedAt"],
      },
    });

    res.status(201).json({
      status: "Success",
      message: "User Valid",
      data: getUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

module.exports = {
  login,
  register,
  checkAuth,
};
