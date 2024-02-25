//Implement indexing on the "name" field of the "Product" collection to optimize query performance. Write a function to create the index.

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/productsDB', { useNewUrlParser: true, useUnifiedTopology: true });

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Product = mongoose.model('Product', productSchema);

function createProductNameIndex() {
  Product.createIndexes({ name: 1 }, (err) => {
    if (err) {
      console.error('Failed to create index on the "name" field:', err);
    } else {
      console.log('Index on the "name" field created successfully');
    }
    mongoose.connection.close();
  });
}

createProductNameIndex();
