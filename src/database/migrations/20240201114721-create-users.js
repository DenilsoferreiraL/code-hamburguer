'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNUll: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNUll: false
      },
      email: {
        type: Sequelize.STRING,
        allowNUll: false,
        unique: true
      },

      password_hash: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNUll: false
      },

      created_at: {
        type: Sequelize.DATE,
        allowNUll: false
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNUll: false
      }

    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users')
  }
}
