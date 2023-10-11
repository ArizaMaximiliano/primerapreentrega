const fs = require('fs');

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async createCart(cart) {
        const carts = await this.getCarts();
        const newCart = {
            id: carts.length + 1,
            products: []
        };

        carts.push(newCart);

        await this.saveCarts(carts);

        return newCart;
    }

    async getCart(cartId) {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === cartId);
    }

    async addProductCart(cartId, productId, quantity) {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart.id === cartId);
    
        if (cart) {
            const existingProduct = cart.products.find(product => product.product === productId);
    
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
    
            await this.saveCarts(carts);
        } else {
            throw new Error('Cart not found');
        }
    }

    async getCarts() {
        if (!await this.existsFile(this.path)) {
            return [];
        }

        try {
            const content = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(content);
        } catch (error) {
            throw new Error(`Unable to read the file ${this.path}`);
        }
    }

    async saveCarts(carts) {
        const content = JSON.stringify(carts, null, '\t');
        try {
            await fs.promises.writeFile(this.path, content, 'utf-8');
        } catch (error) {
            throw new Error(`Unable to write the file ${this.path}`);
        }
    }

    async existsFile(path) {
        try {
            await fs.promises.access(path);
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = CartManager;
