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
  
    generateId() {
      return new Date().getTime().toString();
    }
  }
  
  const productManager = new ProductManager();
  console.log(productManager.getProducts());

  const newProduct = productManager.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
  });
  
  console.log(productManager.getProducts());
  
  try {
    productManager.addProduct({
      title: 'producto prueba',
      description: 'Este es un producto prueba',
      price: 200,

      
      thumbnail: 'Sin imagen',
      code: 'abc123',
      stock: 25,
    });
  } catch (error) {
    console.error(error.message);
  }
  const retrievedProduct = productManager.getProductById(newProduct.id);
  console.log(retrievedProduct);