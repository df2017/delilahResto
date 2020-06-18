/************************ Search all elements ************************/
exports.getAll = (Model) =>
  async (req, res) => {

    const results = await Model.findAll();

    if (!results) {
      return next('No product Found', 404);
    }
    res.status(200).json({
      status: 'success',
      results: results.length,
      data: results,
    });
  };

/************************ Search one element ************************/
exports.getOne = (Model) =>
  async (req, res) => {
    Model.findByPk(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Element with id: ${req.params.id}, not found.`,
        });
        return;
      }
      res.status(200).json({
        status: 'success',
        data: data,
      });
    })
  };

/************************ Create one element ************************/
exports.createOne = (Model) =>
  async (req, res) => {
    
    Model.create(req.body)
    .then((data) => {
      if (!data) {
        res.status(400).json({
          message: 'Attributes invalid',
        });
        return;
      }
      res.status(200).json({
        status: 'success',
        data: data,
      });
    })
    .catch((error) => {
      res.send(error)
      return;
    })
  };

/************************ Update one element ************************/
exports.updateOne = (Model) =>
  async (req, res) => {
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
          if(!columnTable.includes(params)) validAttribute = false
      })  

      if(!validAttribute){
        res.status(400).json({
          message: 'Attributes invalid',
        });
          eturn;
      }
      else {
        Model.update(req.body, {
          where: {
              id: req.params.id,
          },
        })
        res.status(200).json({
          status: 'success',
          data: req.body,
        });
      } 
    })
};

/************************ Delete one element ************************/
exports.deleteOne = (Model) =>
  async (req, res) => {
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
      })
      res.status(204).json();
    })
  };