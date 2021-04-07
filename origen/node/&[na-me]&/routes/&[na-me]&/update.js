'use strict';
const &[name]&Service = require('../../services/&[na-me]&/index');


async function update&[Name]&(req, res) {

  let jsonAPI = global.app.utils.jsonAPI;
  const models = global.app.orm.sequelize.models;

  try{
    let response =  await &[name]&Service.update(req.body,req.&[name]&.id);
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

module.exports = update&[Name]&;