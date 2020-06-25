const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = (Model) => async (req, res) => {
  let user = req.body.userName;
  let password = req.body.password;

  //Validate if user exist.
  let usr = await Model.findOne({
    where: {
      userName: user,
    },
  });

  if (!usr) {
    res.status(400).send({ messageError: "User o password invalid." });
    return;
  }

  bcrypt.compare(password, usr.dataValues.password, function (err, result) {
    if (err) {
      res.status(500).send({ messageError: "I not verify password." });
      return;
    }
    if (!result) {
      res.status(400).send({ messageError: "Password invalid." });
      return;
    }

    let payload = {
      userId: usr.dataValues.id,
      userName: usr.dataValues.userName,
      role: usr.dataValues.role,
    };

    // generate token.
    jwt.sign(payload, process.env.SECRETKEY, { expiresIn: 600 }, (err, token) => {

        if (err) {
          res.status(500).send({ messageError: err.message });
          return;
        }

        let resultado = {
          userName: usr.dataValues.userName,
          token: token,
        };
        
        res.send(resultado);
      }
    );
  });
};
