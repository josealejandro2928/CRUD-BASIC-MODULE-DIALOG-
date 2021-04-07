/**
 * @param {*} id
 * 
 * @returns
 * {
 *  ok: true
 * }
 *
 */

module.exports = async function remove(id, t = undefined) {
  let models = global.app.orm.sequelize.models;
  let dataBase = global.app.orm.sequelize;
  await models.&[Name]&.destroy({ where:{id:id } , transaction: t });
  return {ok:true}
};
