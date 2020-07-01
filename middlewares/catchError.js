const catchError = (err, req, res, next) => {
  if (err) {
      if (process.env.NODE_ENV === 'dev') {
        res.status(err.statusCode || 500).json({
          status: err.status,
          messageError: err.message,
        });
        return;
    }
    res.send("Unexpected error has occurred. Try again later.. Thanks");
  }
  next();
}

module.exports = {
  catchError: catchError,
};
