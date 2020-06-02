const express = require('express');
const morgan = require('morgan');
//const AppError = require('./utils/appError');


const productRoutes = require('./routes/productsRoutes');
const app = express();

// Development log in
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from the body into req.body
app.use(
  express.json({
    limit: '10kb',
  })
);

app.use('/api/v1/products', productRoutes);


module.exports = app;