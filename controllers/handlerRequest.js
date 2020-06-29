const db = require("../models/index");
const multer = require("multer");
const sequelize  = require("../models/index");
/************************ Search all elements ************************/
exports.getAll = (Model, include) => async (req, res) => {
  const queryFilter = req.query;
  const filter = ["exclude", "limit", "skip"];

  const getFilter = (param) => {
    let typeFilter;
    if (param in req.query) {
      typeFilter = req.query[param];
    } else {
      if (param == "filter") {
        filter.forEach((e) => {
          delete queryFilter[e];
        });
        typeFilter = queryFilter;
      } else {
        typeFilter = "";
      }
    }
    return typeFilter;
  };


  const limitElement = getFilter("limit");
  const sinceElement = getFilter("skip");
  let formatDateHour = '';

  // if(Model == 'Order'){
  //   formatDateHour = Model.sequelize.fn('date_format', Model.sequelize.col('Order.createdAt'), '%H:%i:%s')
  // }
  
  const query = {
    attributes: {
      exclude: getFilter("exclude").split(","), 
     // include: [[formatDateHour, 'Hour']],
    },
    where: {
      ...getFilter("filter"),
    },
    order: [['createdAt', 'DESC'],],
    include: include,
    limit: parseInt(limitElement) || 10,
    offset: parseInt(sinceElement) || 0,
  };

  Model.findAll(query)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: "No products Found",
        });
        return;
      }

      res.status(200).json({
        status: "success",
        results: data.length,
        data: data,
      });
    })
    .catch((error) => {
      if (process.env.NODE_ENV === "dev") {
        res.status(400).json({
          message: error,
        });
        return;
      }
      res.status(400).json({
        message: error.original.code,
      });
    });
};

/************************ Search one element ************************/
exports.getOne = (Model) => async (req, res) => {
  Model.findByPk(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Element with id: ${req.params.id}, not found.`,
        });
        return;
      }
      res.status(200).json({
        status: "success",
        data: data,
      });
    })
    .catch((error) => {
      if (process.env.NODE_ENV === "dev") {
        res.status(400).json({
          message: error,
        });
        return;
      }
      res.status(400).json({
        message: error.original.code,
      });
    });
};

/************************ Create one element ************************/
exports.createOne = (Model) => async (req, res) => {
  Model.create(req.body)
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
    })
    .catch((error) => {
      if (process.env.NODE_ENV === "dev") {
        res.status(400).json({
          message: error,
        });
        return;
      }
      res.status(400).json({
        message: error.errors[0].message,
      });
    });
};

/************************ Upload Images ************************/
const nameProductImage = [];
const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "/../public/images/");
    },
    filename: (req, file, cb) => {
      let name = file.mimetype.split('/')[0];
      let fullName = `${name}-${Math.random()}.jpg`;
      nameProductImage.pop()
      nameProductImage.push(fullName);
      cb(null, fullName);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato no Valido"));
    }
  },
};

exports.upload = multer(configuracionMulter).single("image");

/************************ Create  Product ************************/
exports.createProduct = (Model) => async (req, res) => {

  if(nameProductImage.length != 0){
    req.body.image = `/public/${nameProductImage}`;
  }
  Model.create(req.body)
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
    })
    .catch((error) => {
      if (process.env.NODE_ENV === "dev") {
        res.status(400).json({
          message: error,
        });
        return;
      }
      res.status(400).json({
        message: error.errors[0].message,
      });
    });
};
/************************ Create  Order ************************/
exports.createOrder = (Model) => async (req, res) => {
  const dataBody = req.body;
  let transaction = await db.sequelize.transaction();
  let totalAmount = [];
  let detailOrder = [];

  dataBody.detail.forEach((element) => {
    let totalProduct = element.priceProduct * element.amountProduct;
    detailOrder.push(`${element.amountProduct}x${element.nameProduct}`);
    totalAmount.push(totalProduct);
  });

  dataBody.order.totalAmount = totalAmount.reduce((acc, val) => {
    return acc + val;
  }, 0);
  dataBody.order.details = detailOrder.join(", ");
  try {
    let order = await Model[0].create(dataBody.order, {
      transaction,
    });

    dataBody.detail.forEach((element) => {
      element.id_order = order.dataValues.id;
    });

    let product = await Model[1].bulkCreate(dataBody.detail, {
      transaction,
    });

    await transaction.commit();
    if (product) {
      res.json({
        success: 1,
        //data: product,
      });
    }
  } catch (err) {
    await transaction.rollback();
    res.json({ err });
  }
};

/************************ Update one element ************************/
exports.updateOne = (Model) => async (req, res) => {

  if(nameProductImage.length != 0){
    req.body.image = `/public/${nameProductImage}`;
  }

  Model.findByPk(req.params.id)
    .then((data) => {
      let columnTable = data._options.attributes;
      if (!data) {
        res.status(404).json({
          message: `Element with id: ${req.params.id}, not found.`,
        });
        return;
      }
      let validAttribute = true;
      Object.keys(req.body).forEach((params) => {
        if (!columnTable.includes(params)) validAttribute = false;
      });

      if (!validAttribute) {
        res.status(400).json({
          message: "Attributes invalid",
        });
        eturn;
      } else {
        Model.update(req.body, {
          where: {
            id: req.params.id,
          },
        });
        res.status(200).json({
          status: "success",
          data: req.body,
        });
      }
    })
    .catch((error) => {
      if (process.env.NODE_ENV === "dev") {
        res.status(400).json({
          message: error,
        });
        return;
      }
      res.status(400).json({
        message: error.message,
      });
    });
};

/************************ Delete one element ************************/
exports.deleteOne = (Model) => async (req, res) => {
  Model.findByPk(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Element with id: ${req.params.id}, not found.`,
        });
        return;
      }
      Model.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json();
    })
    .catch((error) => {
      if (process.env.NODE_ENV === "dev") {
        res.status(400).json({
          message: error,
        });
        return;
      }
      res.status(400).json({
        message: error.message,
      });
    });
};
