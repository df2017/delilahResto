//Libraries Node
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser')

//Modules Project
const middleware = require('./middlewares/catchError')
const userRoutes = require('./routes/usersRoutes');
const productRoutes = require('./routes/productsRoutes');
const orderRoutes = require('./routes/ordersRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);

app.use(middleware.catchError);

module.exports = app;