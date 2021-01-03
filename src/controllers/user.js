const { User } = require("../../models");

const index = async (req, res, next) => {
  try {
    const getData = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "role", "password"],
      },
    });
    return res.status(200).json({
      status: "Success",
      data: { users: getData },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const userExist = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!userExist) {
      return res.status(400).send({
        status: "Error",
        message: "User not Found",
      });
    }

    const destroyUser = await User.destroy({
      where: {
        id,
      },
    });

    return res.status(200).json({
      status: "success",
      data: destroyUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.user;
    const getData = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "role", "password"],
      },
    });
    return res.status(200).json({
      status: "Success",
      data: { users: getData },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

module.exports = {
  index,
  destroy,
  getUser,
};
