const { User } = require("../../models");
const roleCheck = async (req, res, next) => {
  try {
    const { id } = req.user;
    const getUser = await User.findOne({
      where: { id },
    });
    if (getUser.role === "admin") {
      next();
    } else {
      res.status(401).json({
        status: "Error",
        message: "Access Denied",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

module.exports = {
  roleCheck,
};
