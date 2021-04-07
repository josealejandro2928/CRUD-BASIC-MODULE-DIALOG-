'use strict';

const &[name]&Service = require('../../services/&[na-me]&/index');

module.exports = create&[Name]&;

async function create&[Name]& (req, res) {
  const models = global.app.orm.sequelize.models;
  let jsonAPI = global.app.utils.jsonAPI;
  let jsonAPIBody = {
    data: {}
  };

  try {
    jsonAPIBody.data = await &[name]&Service.create(req.body)
    return res.status(201).json(jsonAPIBody); // OK.
  } catch (error) {
    let status = (error.name == global.app.orm.Sequelize.ValidationError)?400:error.status;
    global.app.utils.logger.error(error, {
      module: '&[na-me]&/create',
      submodule: 'routes',
      stack: error.stack
    });
    return res.status(status||500)
      .json(jsonAPI.processErrors(error, req, {
        file: __filename
      }));
  }
}