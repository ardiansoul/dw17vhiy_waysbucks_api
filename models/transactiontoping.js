"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionToping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // TransactionToping.belongsTo(models.TransactionProduct, {
      //   as: "topings",
      //   foreignKey: "TransactionProductId",
      // });
      // TransactionToping.belongsTo(models.Toping, {
      //   as: "toping",
      // });
    }
  }
  TransactionToping.init(
    {
      transactionProductId: DataTypes.INTEGER,
      topingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TransactionToping",
    }
  );
  return TransactionToping;
};
