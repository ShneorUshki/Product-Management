const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json())

const fileName = 'products.json';
const initialProduct = [];

const shop = {

    async read() {
        try {
            await fs.access(fileName);
            this.products = JSON.parse((await fs.readFile(fileName)).toString());
        } catch (e) {
            this.products = initialProduct
        }
        return this.products
    },

    async save() {
        await fs.writeFile(fileName, JSON.stringify(this.products))
    },

    async getNextProdId() {
        let maxId = 0;
        const product = await this.read();
        product.forEach(prod => {
            if (prod.id > maxId) maxId = prod.id
        });
        return maxId + 1;
    },

    async getIndexBiId(id) {
        const product = await shop.read();
        const index = product.findIndex(prod => prod.id === +id);
        return index
    },
    products: []
}



/* requests */



app.get('/products', async(req, res) => {
    res.json(await shop.read())
});


app.post('/products', async(req, res) => {
    const product = req.body;
    product.id = await shop.getNextProdId();
    shop.products.push(product);
    await shop.save();
    res.json('ok')
});

app.put('/products/:id', async(req, res) => {
    const index = await shop.getIndexBiId(req.params.id);
    const { Type, color, size, paid, amount, name } = req.body
    const product = shop.products[index];
    product.Type = Type;
    product.color = color;
    product.size = size;
    product.paid = paid;
    product.amount = amount;
    product.name = name;

    await shop.save();
    res.json('ok')
})


app.listen(8080, () => {
    console.log('listen...');
})