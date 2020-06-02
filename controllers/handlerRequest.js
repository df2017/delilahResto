
exports.getAll = (Model) =>
  async (req, res, next) => {

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

exports.getOne = (Model) =>
  async (req, res, next) => {
    const result = await Model.findByPk(req.params.id);

    if (!result) {
      return next(
       `No client was found with the id: ${req.params.id}`, 404
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: result,
      },
    });
  };

exports.createOne = (Model) =>
  async (req, res, next) => {
    const result = await Model.create(req.body);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  };

exports.updateOne = (Model) =>
  async (req, res, next) => {
    const result = await Model.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!result) {
      return next(`Element with id: ${req.params.id}, couldn't been updated.`,404);
    }
    const data = await Model.findByPk(req.params.id);
    res.status(200).json({
      status: 'success',
      data: data,
    });
  };

exports.deleteOne = (Model) =>
  async (req, res, next) => {
    Model.findOne({
      where: {
        id: req.params.id,
      },
    }).then((data) => {
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