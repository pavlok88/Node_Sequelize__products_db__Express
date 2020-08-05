'use strict';
module.exports = (sequelize, DataTypes) => {
    const Groups = sequelize.define('groups',
        {
            group_title: {
                type: DataTypes.STRING(128),
                unique: true,
                allowNull: false
            }
        },
        {
            timestamps: false
        })

    return Groups;
};
