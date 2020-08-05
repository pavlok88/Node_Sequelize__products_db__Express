'use strict';
module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define('products',
        {
            prod_name: {
                type: DataTypes.STRING(128),
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {min: 1}
            }
        },
        {
            timestamps: false
        });

//DOES NOT WORK I DON'T KNOW WHY !?
    /*    Products.associate = function (models) {
            Products.belongsTo(models.Manufacturers, {
                foreignKey: 'manuf_id',
                targetKey: 'id',
                onDelete: 'CASCADE',
                onUpdate: 'SET NULL'
            });
            Products.belongsTo(models.Groups, {
                foreignKey: 'group_id',
                targetKey: 'id',
                onDelete: 'CASCADE',
                onUpdate: 'SET NULL'
            });
        };*/

    return Products;
};

