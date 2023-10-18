const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        try {
            const { title, description, code, price, status, stock, category, thumbnail } = product;
    
            if (!title || !description || !code || !price || !status || !category) {        //Verifico todos los campos
                throw new Error('Todos los campos son obligatorios.');
            }
    
            const products = await getJSONFromFile(this.path);
    
            if (products.find((existingProduct) => existingProduct.code === code)) {    //Verifico si existe un producto con el mismo code
                throw new Error(`Error: Código (${code}) ya existente.`);
            }
    
            let newId = products.length + 1;                                            //Nuevo id (puede haber problemas si se borran varios productos)
    
            const newProduct = {                                                        //Nuevo producto
                id: newId,
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail,
            };
    
            products.push(newProduct);
            console.warn(`Producto agregado correctamente.`);
    
            await saveJSONToFile(this.path, products);                                 //Guardo lista con el nuevo producto

            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    async getProduct() {
        const products = await getJSONFromFile(this.path);                         //Agregue async await al getProduct
    
        if (products) {
            return products;
        } else {
            console.error('No se pudieron obtener los productos');
        }
    }

    async getProductByID(id) {
        const products = await getJSONFromFile(this.path);

        const productByID = products.find((product) => product.id === id);          //Busco el producto en la lista uso .find para que me devuelva el objeto

        if (productByID) {
            console.warn(`Producto con el ID (${id}) encontrado:`);
            return productByID;
        } else {
            console.error(`Error: ID (${id}) no existente.`);
        }
    }

    async updateProduct(id, updatedProduct) {
        const { title, description, price, image, code, stock } = updatedProduct;

        if (!title || !description || !price || !image || !code || !stock) {        //Verifico todos los campos
            console.error('Todos los campos son obligatorios.');
        }

        const products = await getJSONFromFile(this.path);

        const productID = products.findIndex((product) => product.id === id);       //Busco id en la lista

        if (productID === -1) {                                                     //.findIndex si no encuentra un id devuelve -1
            console.error(`Error: Producto con ID (${id}) no encontrado.`);
            return;
        }

        const updatedProductData = {
            id,
            title,
            description,
            price,
            image,
            code,
            stock,
        };

        products[productID] = updatedProductData;

        console.warn(`Producto con ID (${id}) actualizado correctamente.`, updatedProductData);

        await saveJSONToFile(this.path, products);                                  //Guardo lista con el producto actualizado
    }

    async deleteProduct(id) {
        const products = await getJSONFromFile(this.path);

        const productIndex = products.findIndex((product) => product.id === id);    //Busco id en la lista (quizas tuve que crear una funcion para no repetir tanto codigo)

        if (productIndex === -1) {
            console.error(`Error: Producto con ID (${id}) no encontrado.`);
            return;
        }

        products.splice(productIndex, 1);                                           //Elimino el producto de la lista

        console.warn(`Producto con ID (${id}) eliminado correctamente.`);

        await saveJSONToFile(this.path, products);                                  //Guardo lista sin el producto
    }
}

/****************
*   Utilities   *
*****************/

const existFile = async (path) => {
    try {
        await fs.promises.access(path);
        return true;
    } catch (error) {
        return false;
    }
};

const getJSONFromFile = async (path) => {
    if (!await existFile(path)) {
        return [];
    }

    let content;

    try {
        content = await fs.promises.readFile(path, 'utf-8');
    } catch (error) {
        throw new Error(`El archivo ${path} no pudo ser leído.`);
    }

    try {
        return JSON.parse(content);
    } catch (error) {
        throw new Error(`El archivo ${path} no tiene un formato JSON válido.`);
    }
};

const saveJSONToFile = async (path, data) => {
    const content = JSON.stringify(data, null, '\t');
    try {
        await fs.promises.writeFile(path, content, 'utf-8');
    } catch (error) {
        throw new Error(`El archivo ${path} no pudo ser escrito.`);
    }
};


//----//

module.exports = ProductManager;                    
