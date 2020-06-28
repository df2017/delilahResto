//Libraries Node
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
//Middleware Project
const middlewareError = require('./middlewares/catchError');

//Modules Project
const userRoutes = require('./routes/usersRoutes');
const productRoutes = require('./routes/productsRoutes');
const orderRoutes = require('./routes/ordersRoutes');
const orderProductRoutes = require('./routes/orderProductRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload.single('image')); 

app.use(express.static('public/images'));

app.use(cors());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/order/products', orderProductRoutes);

app.use(middlewareError.catchError);

module.exports = app;