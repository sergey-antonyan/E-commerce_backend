'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.hasMany(models.User_Address);
    }
  }
  Address.init({
    Address1: DataTypes.STRING,
    Address2: DataTypes.STRING,
    city: DataTypes.STRING,
    region: DataTypes.STRING,
    country: DataTypes.STRING,
    postal_code: DataTypes.INTEGER,
    Phone_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};