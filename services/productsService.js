const faker = require('faker');

class ProductsSevice {
  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 100;
    for (let i = 1; i <= limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  async find() {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        resolve(this.products);
      }, 4000);
    });
  }

  async findOne(id) {
    return this.products.find((item) => item.id === id);
  }

  async update(id, data) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Product not found');

    const product = this.products[index];

    this.products[index] = {
      ...product,
      ...data,
    };

    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Product not found');

    this.products.splice(index, 1);

    return { id };
  }
}

module.exports = new ProductsSevice();
