'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.belongsTo(models.Category,{foreignKey:"categoryId"});
      Products.hasMany(models.Shoping_Cart, {foreignKey:"productId"});
    }
  }
  Products.init({
    product_name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    categoryId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    product_color: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};