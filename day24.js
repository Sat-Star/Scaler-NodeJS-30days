const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/productsDB', { useNewUrlParser: true, useUnifiedTopology: true });

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Product = mongoose.model('Product', productSchema);

app.use(bodyParser.json());

app.post('/products', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

app.put('/products/:productId', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.delete('/products/:productId', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
