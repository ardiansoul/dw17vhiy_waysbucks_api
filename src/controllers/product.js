const { Product } = require("../../models");
const validationForm = require("../middleware/validationForm");

const index = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const getData = await Product.findOne({
        where: { id },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (getData === null) {
        return res.status(400).json({
          status: "Error",
          message: "Product not Found",
        });
      }
      return res.status(200).json({
        status: "Success",
        message: "Product successfully loaded",
        data: { product: getData },
      });
    } else {
      const getData = await Product.findAll({
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!getData) {
        return res.status(400).json({
          status: "Error",
          message: "Product not Found",
        });
      }
      return res.status(200).json({
        status: "Success",
        message: "Products successfully loaded",
        data: { products: getData },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Error",
      message: err,
    });
  }
};

const store = async (req, res, next) => {
  try {
    if (req.file) req.body.photo = req.file.path;

    const { error } = validationForm.productValidation(req.body);
    if (error) {
      console.error(error);
      return res.status(400).send({
        status: "Error",
        message: error.details[0].message,
      });
    }

    const productExists = await Product.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (productExists) {
      console.error(error);
      return res.status(400).send({
        status: "Error",
        message: "Product already exists",
      });
    }

    const createData = await Product.create(req.body);

    const getData = await Product.findOne({
      where: {
        id: createData.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(201).json({
      status: "Success",
      message: "Product successfully created",
      data: { product: getData },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: err,
    });
  }
};

const update = async (req, res, next) => {
  try {
    if (req.file) req.body.photo = req.file.path;

    const { id } = req.params;
    const dataExist = await Product.findOne({
      where: {
        id,
      },
    });

    if (!dataExist) {
      return res.status(400).json({
        status: "Error",
        message: "Product not Found",
      });
    }
    await Product.update(req.body, {
      where: {
        id,
      },
    });
    const getData = await Product.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    console.log(getData.photo);
    res.status(200).json({
      status: "Success",
      message: "Product successfully updated",
      data: { product: getData },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dataExist = await Product.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!dataExist) {
      return res.status(400).json({
        status: "Error",
        message: "Product not Found",
      });
    }
    await Product.destroy({ where: { id } });

    res.status(200).json({
      status: "Success",
      message: "Product successfully deleted",
      data: { id },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

module.exports = {
  index,
  store,
  update,
  destroy,
};
