"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.hasMany(models.TransactionProduct, {
        as: "products",
        foreignKey: "transactionId",
      });
      Transaction.belongsTo(models.User, { as: "user", foreignKey: "userId" });
    }
  }
  Transaction.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.BIGINT,
      address: DataTypes.TEXT,
      posCode: DataTypes.INTEGER,
      attachment: DataTypes.STRING,
      status: DataTypes.STRING,
      income: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
