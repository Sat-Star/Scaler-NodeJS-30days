// Implement a set of CRUD (Create, Read, Update, Delete) operations for a "Product" entity using MongoDB and Mongoose.
// Define a Mongoose schema for the product with properties like "name," "price," and "quantity."
// Implement functions to create, read, update, and delete products.

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/productsDB', { useNewUrlParser: true, useUnifiedTopology: true });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const Product = mongoose.model('Product', productSchema);

function createProduct(product) {
  const newProduct = new Product(product);
  return newProduct.save();
}

function getAllProducts() {
  return Product.find();
}

function updateProduct(productId, updatedProduct) {
  return Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
}

function deleteProduct(productId) {
  return Product.findByIdAndDelete(productId);
}

async function testCRUDOperations() {
  const newProduct = await createProduct({ name: 'Laptop', price: 999.99, quantity: 10 });
  console.log('New Product:', newProduct);

  const allProducts = await getAllProducts();
  console.log('All Products:', allProducts);

  const updatedProduct = await updateProduct(newProduct._id, { price: 1099.99 });
  console.log('Updated Product:', updatedProduct);

  const deletedProduct = await deleteProduct(newProduct._id);
  console.log('Deleted Product:', deletedProduct);

  mongoose.connection.close();
}

testCRUDOperations();
