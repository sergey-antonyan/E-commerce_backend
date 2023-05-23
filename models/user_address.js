'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User_Address.belongsTo(models.Users);
      User_Address.belongsTo(models.Address);
    }
  }
  User_Address.init({
    userId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_Address',
  });
  return User_Address;
};