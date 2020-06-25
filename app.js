//Libraries Node
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

//Middleware Project
const middlewareError = require('./middlewares/catchError');

//Modules Project
const userRoutes = require('./routes/usersRoutes');
const productRoutes = require('./routes/productsRoutes');
const orderRoutes = require('./routes/ordersRoutes');
const orderProductRoutes = require('./routes/orderProductRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/order/products', orderProductRoutes);

app.use(middlewareError.catchError);

module.exports = app;