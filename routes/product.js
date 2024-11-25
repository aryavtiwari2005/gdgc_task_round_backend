const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataFile = path.join(__dirname, '../data/products.json');

const readProducts = () => {
  const data = fs.readFileSync(dataFile, 'utf-8');
  return JSON.parse(data);
};

const saveProducts = (products) => {
  fs.writeFileSync(dataFile, JSON.stringify(products, null, 2), 'utf-8');
};

router.get('/', (req, res) => {
  const products = readProducts();
  res.json({ data: products.data });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const products = readProducts();
  const product = products.data.find(item => item.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json({ data: product });
});

router.post('/', (req, res) => {
  const { title, description, seller, rating } = req.body;

  if (!title || !description || !seller) {
    return res.status(400).json({ error: 'Title, description, and seller are required' });
  }

  const products = readProducts();
  const newId = products.lastId + 1;

  const newProduct = {
    id: newId,
    title,
    description,
    seller,
    rating: rating || 0,
  };

  products.data.push(newProduct);
  products.lastId = newId;
  saveProducts(products);

  res.status(201).json({ data: newProduct });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, rating } = req.body;

  const products = readProducts();
  const productIndex = products.data.findIndex(item => item.id === parseInt(id));

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const updatedProduct = products.data[productIndex];

  if (title) updatedProduct.title = title;
  if (description) updatedProduct.description = description;
  if (rating !== undefined) updatedProduct.rating = rating;

  saveProducts(products);

  res.json({ data: updatedProduct });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const products = readProducts();
  
  const productIndex = products.data.findIndex(item => item.id === parseInt(id));

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products.data.splice(productIndex, 1);

  products.data.forEach((item, index) => {
    item.id = index + 1;
  });

  products.lastId = products.data.length > 0 ? products.data[products.data.length - 1].id : 0;
  
  saveProducts(products);

  res.status(200).send('Product deleted successfully and IDs updated');
});

module.exports = router;
