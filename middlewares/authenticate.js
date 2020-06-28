const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {

  let token;
  if (!req.headers.authorization) {
    res.status(401).send( {messageError: "Not have authorization."});
    return;
  }
  else{
    token = req.headers.authorization.split(" ")[1];
  }
  // Validate token.
  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    console.log(decoded)
    req.userInfo = decoded;
  });

  next();
};

exports.accessOnlyAdmin = (req, res, next) => {
  if (!req.userInfo.role) {
    res.status(401).json({ messageError: "Unauthorized. Only admin role" });
    return;
  }
  next();
};

exports.onlyOwner = (req, res, next) => {
  if(parseInt(req.params.id) !== parseInt(req.userInfo.userId)){
    res.status(401).json({ messageError: "Unauthorized" });
    return;
  }
  next();
};