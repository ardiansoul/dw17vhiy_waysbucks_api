const {
  Transaction,
  TransactionProduct,
  TransactionToping,
  User,
  Toping,
  Product,
} = require("../../models");
const product = require("../../models/product");
const { transValidation } = require("../middleware/validationForm");

{
}
const getUserTransaction = async (req, res, next) => {
  try {
    const { id } = req.user;

    const getTransaction = await Transaction.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        userId: id,
      },
      attributes: {
        exclude: ["productId", "UserId", "userId", "createdAt", "updatedAt"],
      },
      include: [
        {
          attributes: {
            exclude: ["password", "status", "createdAt", "updatedAt"],
          },
          model: User,
          as: "user",
        },
        {
          model: TransactionProduct,
          as: "products",
          attributes: {
            exclude: ["transactionId", "productId", "updatedAt"],
          },
          include: [
            {
              model: Product,
              as: "product",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: Toping,
              as: "topings",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
              through: { attributes: [] },
            },
          ],
        },
      ],
    });
    console.log(getTransaction);

    res.status(200).json({
      status: "Success",
      data: { transaction: getTransaction },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const index = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id) {
      const getTransaction = await Transaction.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["productId", "UserId", "userId", "createdAt", "updatedAt"],
        },
        include: [
          {
            attributes: {
              exclude: ["password", "status", "createdAt", "updatedAt"],
            },
            model: User,
            as: "user",
          },
          {
            model: TransactionProduct,
            as: "products",
            attributes: {
              exclude: ["transactionId", "productId", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: Product,
                as: "product",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
              {
                model: Toping,
                as: "topings",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
                through: { attributes: [] },
              },
            ],
          },
        ],
      });

      if (getTransaction === null) {
        return res.status(400).json({
          status: "Error",
          message: "Transaction not Found",
        });
      }

      res.status(200).json({
        status: "Success",
        message: "Transaction successfully loaded",
        data: { transaction: getTransaction },
      });
    } else {
      const getAllTransaction = await Transaction.findAll({
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["productId", "UserId", "userId", "createdAt", "updatedAt"],
        },
        include: [
          {
            attributes: {
              exclude: ["password", "status", "createdAt", "updatedAt"],
            },
            model: User,
            as: "user",
          },
          {
            model: TransactionProduct,
            as: "products",
            attributes: {
              exclude: ["transactionId", "productId", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: Product,
                as: "product",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
              {
                model: Toping,
                as: "topings",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
                through: { attributes: [] },
              },
            ],
          },
        ],
      });
      res.status(200).json({
        status: "Success",
        message: "Transactions successfully loaded",
        data: { transaction: getAllTransaction },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const store = async (req, res, next) => {
  try {
    if (req.file) req.body.attachment = req.file.path;
    req.body.userId = req.user.id;
    console.log(req.body);

    const { error } = transValidation(req.body);

    if (error) {
      console.error(error);
      return res.status(400).send({
        status: "Error",
        message: error.details[0].message,
      });
    }

    const {
      userId,
      name,
      email,
      phone,
      address,
      posCode,
      status,
      income,
      products,
      attachment,
    } = req.body;

    const createTransaction = await Transaction.create({
      userId,
      name,
      email,
      phone,
      address,
      posCode,
      status,
      income,
      attachment,
    });

    for (const product of products) {
      console.log(product);
      let createTransactionProduct = await TransactionProduct.create({
        transactionId: createTransaction.id,
        amount: product.amount,
        productId: product.productId,
      });
      if (product.topings > 0) {
        await Promise.all(
          product.topings.map(async (toping) => {
            await TransactionToping.create({
              transactionProductId: createTransactionProduct.id,
              topingId: toping,
            });
          })
        );
      }
    }

    const getTransaction = await Transaction.findOne({
      where: {
        id: createTransaction.id,
      },
      attributes: {
        exclude: ["productId", "UserId", "userId", "createdAt", "updatedAt"],
      },
      include: [
        {
          attributes: {
            exclude: ["password", "status", "createdAt", "updatedAt"],
          },
          model: User,
          as: "user",
        },
        {
          model: TransactionProduct,
          as: "products",
          attributes: {
            exclude: ["transactionId", "productId", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: Product,
              as: "product",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: Toping,
              as: "topings",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    console.log(JSON.stringify(getTransaction, null, 2));
    res.status(200).json({
      status: "Success",
      message: "Transaction successfully created",
      data: { transaction: getTransaction },
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
    console.log(req.body);

    const transExist = await Transaction.findOne({
      where: { id },
    });

    if (!transExist) {
      return res.status(400).send({
        status: "Error",
        message: "Transaction not Found",
      });
    }

    await Transaction.update({ status: req.body.status }, { where: { id } });

    const getTransaction = await Transaction.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["productId", "UserId", "userId", "createdAt", "updatedAt"],
      },
      include: [
        {
          attributes: {
            exclude: ["password", "status", "createdAt", "updatedAt"],
          },
          model: User,
          as: "user",
        },
        {
          model: TransactionProduct,
          as: "products",
          attributes: {
            exclude: ["transactionId", "productId", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: Product,
              as: "product",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: Toping,
              as: "topings",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
              through: { attributes: [] },
            },
          ],
        },
      ],
    });
    res.status(200).json({
      status: "Success",
      message: "Transaction successfully updated",
      data: { transaction: getTransaction },
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

    const transExist = await Transaction.findOne({
      where: { id },
    });

    if (!transExist) {
      return res.status(400).send({
        status: "Error",
        message: "Transaction not Found",
      });
    }

    const destroyTransaction = await Transaction.destroy({ where: { id } });
    res.status(200).json({
      status: "Success",
      message: "Transaction successfully deleted",
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
  getUserTransaction,
};
