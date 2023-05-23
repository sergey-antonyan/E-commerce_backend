'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shoping_Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shoping_Cart.belongsTo(models.Users, {foreignKey:"userId"});
      Shoping_Cart.belongsTo(models.Products, {foreignKey:"productId"});
    }
  }
  Shoping_Cart.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Shoping_Cart',
  });
  return Shoping_Cart;
};