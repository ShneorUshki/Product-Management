const express = require('express');
const fs = require('fs').promises;


const app = express();

const fileName = products.json;
const initialProduct = [];

const shop = {

    async rede() {
        try {
            await fs.access(fileName);
            this.products = JSON.parse((await fs.readFile).toString());
        } catch (e) {
            this.products = initialProduct
        }
        return this.product
    },

    async save() {
        await fs.writeFile(fileName, json.stringify(this.products))
    },
    products: []
}



/* requests */



app.get('/products', async(req, res) => {
    res.json(shop.rede())
});





app.listen(8080)