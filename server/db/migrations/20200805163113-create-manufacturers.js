'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('manufacturers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER
            },
            manuf_name: {
                type: Sequelize.DataTypes.STRING(128),
                unique: true,
                allowNull: false
            },
            manuf_email: {
                type: Sequelize.DataTypes.STRING(128),
                unique: true,
                allowNull: false,
                validate: {isEmail: true}
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('manufacturers');
    }
};
