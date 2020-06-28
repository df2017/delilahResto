const db = require("../models/index");
const e = require("express");

/************************ Search all elements ************************/
exports.getAll = (Model, include) => async (req, res) => {

  const queryFilter = req.query;
  const filter = ['exclude','limit','skip']

  const getFilter = (param) => {
    let typeFilter;
    if(param in req.query){
      typeFilter = req.query[param]
    }
    else{
      if(param == 'filter'){
        filter.forEach((e)=> {
          delete queryFilter[e]
        })
        typeFilter = queryFilter
      }else{
        typeFilter = ''
      }  
    }
    return typeFilter
  }
  
  const limitElement = getFilter('limit');
  const sinceElement =  getFilter('skip');

  const query = {
    attributes: {
      exclude: getFilter('exclude').split(","),
    },
    where: {
      ...getFilter('filter'),
    },
    include: include,
    limit: parseInt(limitElement) || 5,
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
  console.log(req.body)
  req.body.image = req.file
  console.log(req.body)
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
