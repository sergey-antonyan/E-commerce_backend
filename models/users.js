'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    
    static associate(models) {
      Users.hasMany(models.User_Address);
      Users.hasMany(models.Shoping_Cart, {foreignKey:"userId"});
    }
  }
  Users.init({
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
    is_verified: DataTypes.INTEGER,
    user_ip: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};