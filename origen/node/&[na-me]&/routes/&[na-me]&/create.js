'use strict';

const &[name]&Service = require('../../services/&[na-me]&/index');

async function create&[Name]& (req, res) {
  const models = global.app.orm.sequelize.models;
  let jsonAPI = global.app.utils.jsonAPI;
  let jsonAPIBody = {
    data: {}
  };
  try {
    let user = req.loggedUser;
    let {body, errors} = checkAndPrepareBody(req.body, user);

    if (errors && errors.length) {
      return res.status(400).json({ errors: errors });
    }

    jsonAPIBody = await &[name]&Service.create(body)
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
/**
 * 
 * @param {*} data body mandado por el cliente
 * @param {*} user usuario que realiza la operación
 */
function checkAndPrepareBody(data, user=undefined) {
  let errors = [];
  //Chequeando estructura que proviene del body
   
  /////////////////////////////////////////
  let body = {...data};
  return { body: body, errors: errors };
}

module.exports = create&[Name]&;