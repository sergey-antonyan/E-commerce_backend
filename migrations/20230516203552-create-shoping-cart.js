'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Shoping_Carts', { // SELECT Users.firstName , Products.product_name , Shoping_Carts.quantity FROM Shoping_Carts 
      //INNER JOIN Users ON Users.id = Shoping_Carts.userId ;
      //INNER JOIN Products ON Products.id = Shoping_Carts.productId

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {model:'Users', key:'id'}
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {model:'Products', key:'id'}
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Shoping_Carts');
  }
};