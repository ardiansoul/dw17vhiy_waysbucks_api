"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TransactionProduct.belongsToMany(models.Toping, {
        as: "topings",
        foreignKey: "transactionProductId",
        through: "TransactionToping",
      });

      // TransactionProduct.hasMany(models.TransactionToping, {
      //   as: "topings",
      //   foreignKey: "TransactionProductId",
      // });
      TransactionProduct.belongsTo(models.Transaction, {
        as: "transaction",
        foreignKey: "transactionId",
      });
      TransactionProduct.belongsTo(models.Product, {
        as: "product",
        foreignKey: "productId",
      });
    }
  }
  TransactionProduct.init(
    {
      transactionId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TransactionProduct",
    }
  );
  return TransactionProduct;
};
