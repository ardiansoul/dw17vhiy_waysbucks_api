"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Toping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Toping.belongsToMany(models.TransactionProduct, {
        as: "topings",
        through: "TransactionToping",
        foreignKey: "topingId",
      });
      // Toping.hasMany(models.TransactionToping, {
      //   as: "toping",
      //   foreignKey: "topingId",
      // });

      // Toping.hasMany(models.TransItem);
    }
  }
  Toping.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Toping",
    }
  );
  return Toping;
};
