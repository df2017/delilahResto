function catchError(err, req, res, next) {
    
    if(err) {

      if (process.env.NODE_ENV === 'dev') {
        res.status(err.statusCode).json({
          status: err.status,
          message: err.message,
          stack: err.stack
        });
      }
      res.send("Ha ocurrido un error inesperado. Intente mas tarde.");
      return;
    }
    next();
  }

module.exports = {
    catchError: catchError,
  }