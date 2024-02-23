//Extend the previous "Product" schema to include a reference to a "Category" entity.
// Implement a Mongoose population query to retrieve all products with their corresponding category details.

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/productsDB', { useNewUrlParser: true, useUnifiedTopology: true });

const categorySchema = new mongoose.Schema({
  name: String,
});

const Category = mongoose.model('Category', categorySchema);

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

const ProductWithCategory = mongoose.model('ProductWithCategory', productSchema);

function getProductsPopulatedWithCategory() {
  return ProductWithCategory.find().populate('category');
}

async function testPopulatedQuery() {
  const newCategory = await Category.create({ name: 'Electronics' });

  const newProduct = await ProductWithCategory.create({
    name: 'Laptop',
    price: 999.99,
    quantity: 10,
    category: newCategory._id,
  });

  const productsWithCategory = await getProductsPopulatedWithCategory();
  console.log('Products with Category:', productsWithCategory);

  mongoose.connection.close();
}

testPopulatedQuery();
