const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');

const productManager = new ProductManager('./src/files/products.json');

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProduct();

        if (limit) {
            res.json(products.slice(0, parseInt(limit)));
        } else {
            res.json(products);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ERROR: ha ocurrido un error interno del servidor' });
    }
});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const product = await productManager.getProductByID(parseInt(pid));
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'ERROR: El producto no fue encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ERROR: ha ocurrido un error interno del servidor' });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = req.body;
        const addedProduct = await productManager.addProduct(product);
        res.json({ message: 'Producto agregado correctamente', product: addedProduct }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ERROR: ha ocurrido un error interno del servidor' });
    }
});

router.put('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const updatedProduct = req.body;
        await productManager.updateProduct(parseInt(pid), updatedProduct);
        res.json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ERROR: ha ocurrido un error interno del servidor' });
    }
});

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        await productManager.deleteProduct(parseInt(pid));
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ERROR: ha ocurrido un error interno del servidor' });
    }
});

module.exports = router;
