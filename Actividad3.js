const express = require('express');
const app = express();

class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        const codeExists = this.products.some(product => product.code === code);

        if (codeExists) {
            throw new Error('El código del producto ya está en uso.');
        }

        const id = this.generateId();
        const newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this.products.push(newProduct);
        return newProduct;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);

        if (!product) {
            throw new Error('Producto no encontrado');
        }

        return product;
    }

    updateProduct(id, updates) {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }

        this.products[productIndex] = {
            ...this.products[productIndex],
            ...updates,
        };

        return this.products[productIndex];
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }

        this.products.splice(productIndex, 1);
    }

    generateId() {
        return new Date().getTime().toString();
    }
}

const productManager = new ProductManager();

for (let i = 0; i < 10; i++) {
    productManager.addProduct({
        title: `Producto ${i + 1}`,
        description: 'Descripción de prueba',
        price: Math.floor(Math.random() * 100) + 1,
        thumbnail: 'Sin imagen',
        code: `code${i + 1}`,
        stock: Math.floor(Math.random() * 50) + 1,
    });
}

app.get('/products', (req, res) => {
    res.json(productManager.getProducts());
});

app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    try {
        const product = productManager.getProductById(id);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit) || productManager.getProducts().length;
    const products = productManager.getProducts().slice(0, limit);
    res.json(products);
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});