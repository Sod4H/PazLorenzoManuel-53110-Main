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


console.log("Productos al inicio:", productManager.getProducts());

const newProduct = productManager.addProduct({
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25,
});
console.log("Producto agregado:", newProduct);

console.log("Productos después de agregar uno:", productManager.getProducts());

const retrievedProduct = productManager.getProductById(newProduct.id);
console.log("Producto recuperado por ID:", retrievedProduct);

const updatedProduct = productManager.updateProduct(newProduct.id, { title: 'Nuevo título' });
console.log("Producto actualizado:", updatedProduct);

productManager.deleteProduct(newProduct.id);
console.log("Producto eliminado. Productos restantes:", productManager.getProducts());