'use strict';
module.exports = (sequelize, DataTypes) => {
    const Manufacturers = sequelize.define('manufacturers',
        {
            manuf_name: {
                type: DataTypes.STRING(128),
                unique: true,
                allowNull: false
            },
            manuf_email: {
                type: DataTypes.STRING(128),
                unique: true,
                allowNull: false,
                validate: {isEmail: true}
            }
        },
        {
            timestamps: false
        });

    return Manufacturers;
};
