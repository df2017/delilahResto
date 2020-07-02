//Libraries Node
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

//Middleware Project
const middlewareError = require('./middlewares/catchError');

//Modules Project
const userRoutes = require('./routes/usersRoutes');
const userRoleRoutes = require('./routes/userRoleRoutes');
const productRoutes = require('./routes/productsRoutes');
const orderRoutes = require('./routes/ordersRoutes');
const orderProductRoutes = require('./routes/orderProductRoutes');
const orderStatusRoutes = require('./routes/orderStatusRoutes');
const payTypeRoutes = require('./routes/payTypeRoutes');

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cors());

app.use('/public', express.static(__dirname + '/public/images'));
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/user/roles', userRoleRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/order/products', orderProductRoutes);
app.use('/api/v1/order/statuses', orderStatusRoutes);
app.use('/api/v1/pay/types', payTypeRoutes);

app.use(middlewareError.catchError);

module.exports = app;