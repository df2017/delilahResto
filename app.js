const express = require('express');
const morgan = require('morgan');
//const AppError = require('./utils/appError');
//const globalErrorHandler = require('./controllers/errorController');

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


app.all('*', (req, res, next) => {
  next(`Can't find on this server`, 404);
});

//app.use(globalErrorHandler);

module.exports = app;