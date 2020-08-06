const db = require('../db/models/index');
const {Op} = require("sequelize");

module.exports = {
    connectCheck: async function connectCheck() {
        try {
            await db.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    },
    findProductByGroupId: async function findProductByGroupId(groupId) {
        const data = await db.products.findAll({
            attributes: ['prod_name', 'price'],
            include: {
                model: db.groups,
                attributes: ['id'],
                where: {
                    id: groupId
                }
            }
        });
        console.log(`Products by Group ID = ${groupId}`, JSON.stringify(data, null, 2));

    },
    findProductByManufId: async function findProductByManufId(manufId) {
        const data = await db.products.findAll({
            attributes: ['prod_name', 'price'],
            include: {
                model: db.manufacturers,
                attributes: {
                    include: ['id']
                },
                where: {
                    id: manufId
                }
            },
            include: {
                model: db.groups,
                attributes: ['id', 'group_title'],
            }
        });
        console.log(`Products by Manufacrurer ID = ${manufId}`, JSON.stringify(data, null, 2));
    },
    findProductByPriceRange: async function findProductByPriceRange(priceMin = 0, priceMax = 10e6) {
        if (priceMax < priceMin) return console.log('error wrong range');
        const data = await db.products.findAll({
            attributes: ['prod_name', 'price'],
            where: {
                price: {
                    [Op.between]: [priceMin, priceMax]
                }
            }
        });
        console.log(`Products by Price between ${priceMin} and ${priceMax}`, JSON.stringify(data, null, 2));
    },
    createNewProduct: async function createNewProduct(prod_name, price, manuf_id, group_id) {
        const newProd =  await db.products.create({prod_name: prod_name, price: price, manuf_id: manuf_id, group_id: group_id});
        console.log('New product created', JSON.stringify(newProd))
    }
};
