const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');

const cartManager = new CartManager('./src/files/cart.json');

router.post('/', async (req, res) => {
    try {
        const cart = req.body;
        const newCart = await cartManager.createCart(cart);
        res.json(newCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ERROR: ha ocurrido un error interno del servidor' });
    }
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartManager.getCart(parseInt(cid));
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ error: 'ERROR: El carrito no fue encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ERROR: ha ocurrido un error interno del servidor' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        await cartManager.addProductCart(parseInt(cid), parseInt(pid), quantity);
        res.json({ message: 'Producto agregado al carrito correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ERROR: ha ocurrido un error interno del servidor' });
    }
});

module.exports = router;
