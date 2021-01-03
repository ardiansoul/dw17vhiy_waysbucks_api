const validationForm = require("../middleware/validationForm");

const Toping = require("../../models").Toping;

const index = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const getData = await Toping.findOne({
        where: { id },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (getData === null) {
        return res.status(400).json({
          status: "Error",
          message: "Toping not Found",
        });
      }
      return res.status(200).json({
        status: "Success",
        data: { toping: getData },
      });
    } else {
      const getData = await Toping.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!getData) {
        return res.status(400).json({
          status: "Error",
          message: "Toping not Found",
        });
      }
      res.status(200).json({
        status: "Success",
        data: { topings: getData },
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const store = async (req, res, next) => {
  try {
    if (req.file) req.body.photo = req.file.path;
    console.log(req.body.photo);

    const { error } = validationForm.topingValidation(req.body);

    if (error) {
      console.error(error);
      return res.status(400).send({
        status: "Error",
        message: error.details[0].message,
      });
    }

    const topingExist = await Toping.findOne({
      where: { name: req.body.name },
    });

    if (topingExist) {
      console.error(error);
      return res.status(400).send({
        status: "Error",
        message: "Toping already exists",
      });
    }

    const createData = await Toping.create(req.body);

    const getData = await Toping.findOne({
      where: {
        id: createData.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).json({
      status: "Success",
      data: getData,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const topingExist = await Toping.findOne({
      where: { id },
    });

    if (!topingExist) {
      console.error(error);
      return res.status(400).send({
        status: "Error",
        message: "Toping not Found",
      });
    }
    await Toping.update(req.body, {
      where: {
        id,
      },
    });

    const getData = await Toping.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).json({
      status: "Success",
      data: getData,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const topingExist = await Toping.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!topingExist) {
      return res.status(400).send({
        status: "Error",
        message: "Toping not Found",
      });
    }

    await Toping.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "Toping successfully deleted",
      data: { id },
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
  store,
  update,
  destroy,
};
