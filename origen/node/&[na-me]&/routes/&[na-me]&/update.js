'use strict';
const &[name]&Service = require('../../services/&[na-me]&/index');


async function update&[Name]&(req, res) {

  let jsonAPI = global.app.utils.jsonAPI;
  const models = global.app.orm.sequelize.models;

  try{
    let user = req.loggedUser;
    let {body, errors} = checkAndPrepareBody(req.body,req.&[name]&, user);

    if (errors && errors.length) {
      return res.status(400).json({ errors: errors });
    }

    let response =  await &[name]&Service.update(body,req.&[name]&);
    return res.status(200).json(response); // OK.

  }catch(error){
    let status = (error.name == global.app.orm.Sequelize.ValidationError)?400:error.status;
    global.app.utils.logger.error(error, {
      module: '&[na-me]&/update',
      submodule: 'routes',
      stack: error.stack
    });

    return res.status(status||500)
      .json(jsonAPI.processErrors(error, req, {
        file: __filename
      }));
  }

};
/**
 * 
 * @param {*} data body mandado por el cliente
 * @param {*} &[name]& instancia actual del objeto a editar 
 * @param {*} user  usuario que realiza la operación
 */
function checkAndPrepareBody(data,&[name]&, user=undefined) {
  let errors = [];
  //Chequeando estructura que proviene del body
   
  /////////////////////////////////////////
  let body = {...data};
  return { body: body, errors: errors };
}


module.exports = update&[Name]&;