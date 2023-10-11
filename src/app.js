const express = require('express');
const app = express();
const PORT = 8080;

const productsRouter = require('./routes/ProductRouter.js');
const cartsRouter = require('./routes/CartRouter.js');


app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto: ${PORT}`);
});