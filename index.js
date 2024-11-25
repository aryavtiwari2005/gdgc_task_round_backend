const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/listing', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
