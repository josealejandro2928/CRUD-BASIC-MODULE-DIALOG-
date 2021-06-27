'use strict';
const &[name]&Service = require('../../services/&[na-me]&/index');


async function list&[Name]& (req, res) {
  const models = global.app.orm.sequelize.models;
  let jsonAPI = global.app.utils.jsonAPI;

  let jsonAPIBody = {
    meta: {
      pagination: {}
    },
    data: []
  };

  let query = jsonAPI.buildQueryFromReq({
    req: req,
    model: models.&[Name]&
  });

  query = jsonAPI.prepareQuery(query);

  /*query includes put here*/

  try {
    jsonAPIBody = await &[name]&Service.list(query);
    return res.status(200).json(jsonAPIBody);
  } catch (error) {
    let status = (error.name == global.app.orm.Sequelize.ValidationError)?400:error.status;
    global.app.utils.logger.error(error, {
      module: '&[na-me]&/list',
      submodule: 'routes',
      stack: error.stack
    });
    return res.status(status||500)
      .json(jsonAPI.processErrors(error, req, {
        file: __filename
    }));
  }
};

module.exports = list&[Name]&
