'use strict';
const &[name]&Service = require('../../services/&[na-me]&/index');


async function delete&[Name]& (req, res) {
  let jsonAPI = global.app.utils.jsonAPI;
  try {
    await &[name]&Service.delete(req.&[name]&.id);
    return res.sendStatus(204); // No Content.
  } catch (error) {
    let status = (error.name == global.app.orm.Sequelize.ValidationError)?400:error.status;
    global.app.utils.logger.error(error, {
      module: '&[na-me]&/delete',
      submodule: 'routes',
      stack: error.stack
    });
    return res.status(status||500)
      .json(jsonAPI.processErrors(error, req, {
        file: __filename
      }));
  }
};

module.exports = delete&[Name]&;