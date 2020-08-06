const db = require('./db/models/index');
const {groups, manufacturers,products } = db;
const query = require("./queries/queries");
const express = require('express')
const app = express()
const port = 3000



products.belongsTo(manufacturers, {
    foreignKey: 'manuf_id',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'SET NULL'
});
products.belongsTo(groups, {
    foreignKey: 'group_id',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'SET NULL'
});



//---disable any comment what you like---
//query.connectCheck();
//query.findProductByGroupId(1);
//query.findProductByManufId(2);
//query.findProductByPriceRange(500, 1000)
//query.createNewProduct('NEW PRODUCT',1000,2,2);

//---express nedopilil
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
