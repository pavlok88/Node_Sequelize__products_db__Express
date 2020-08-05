const db = require('./db/models/index');
const Groups = db.groups;
const Manufacturers = db.manufacturers;
const Products = db.products;

/*module.exports = {
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
    };

    async function findProductByManufId(manufId) {
        const data = await Products.findAll({
            attributes: ['prod_name', 'price'],
            include: {
                model: Manufacturers,
                attributes: {
                    include: ['id']
                },
                where: {
                    id: manufId
                }
            },
            include: {
                model: Groups,
                attributes:['id', 'group_title'],
            }
        });
        console.log("All groups:", JSON.stringify(data, null, 2));}
};*/

module.exports = {
    async function connectCheck() {
        try {
            await db.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    };

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
    };

    async function findProductByManufId(manufId) {
        const data = await Products.findAll({
            attributes: ['prod_name', 'price'],
            include: {
                model: Manufacturers,
                attributes: {
                    include: ['id']
                },
                where: {
                    id: manufId
                }
            },
            include: {
                model: Groups,
                attributes:['id', 'group_title'],
            }
        });
        console.log("All groups:", JSON.stringify(data, null, 2));}
};
