'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('issues', { 

      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      repository: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      title: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      comments: {
          type: Sequelize.TEXT,
          allowNull: false,
      },
      labels: {
          type: Sequelize.STRING,
          allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }, 
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }, 
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }, 
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
    await queryInterface.dropTable('issues');
  }
};
