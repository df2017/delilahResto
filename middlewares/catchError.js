const catchError = (err, req, res, next) => {
  if (err) {
      if (process.env.NODE_ENV === 'dev') {
        res.status(err.statusCode || 500).json({
          status: err.status,
          messageError: err.message,
          //stack: err.stack
        });
        return;
    }
    res.send("Ha ocurrido un error inesperado. Intente mas tarde.");
  }
  next();
}

module.exports = {
  catchError: catchError,
};
