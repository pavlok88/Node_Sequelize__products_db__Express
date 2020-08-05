const db = require('./db/models/index');
const Groups = db.groups;
const Manufacturers = db.manufacturers;
const Products = db.products;
const { Op } = require("sequelize");

Products.belongsTo(Manufacturers, {
    foreignKey: 'manuf_id',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'SET NULL'
});
Products.belongsTo(Groups, {
    foreignKey: 'group_id',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'SET NULL'
});
connectCheck();
//findProductByGroupId(1);
//findProductByManufId(2);
findProductByPriceRange(500,1000)

async function findProductByPriceRange(priceMin = 0,priceMax = 99999) {
    if (priceMax<priceMin) return console.log('error wrong range');
    const data = await Products.findAll({
        attributes: ['prod_name', 'price'],
        where:{
            price: {
                [Op.between]: [priceMin, priceMax]
            }
        }
    });
    console.log("All groups:", JSON.stringify(data, null, 2));
}
async function connectCheck() {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
async function findProductByGroupId(groupId) {
    const data = await Products.findAll({
        attributes: ['prod_name', 'price'],
        include: {
            model: Groups,
            attributes: ['id'],
            where: {
                id: groupId
            }
        }
    });
    console.log("All groups:", JSON.stringify(data, null, 2));
}
async function findProductByManufId(manufId) {
    const data = await Products.findAll({
        attributes: ['prod_name', 'price'],
        include: [{
            model: Manufacturers,
            attributes: {
                exclude: ['manuf_email']
            },
            where: {
                id: manufId
            }
        }, {
            model: Groups,
            attributes: ['group_title'],
        }]
    });
    console.log("All groups:", JSON.stringify(data, null, 2));
}


console.log('start')