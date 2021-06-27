/**
 * @param {*} id
 * 
 * @returns
 * {
 *  ok: true
 * }
 *
 */

module.exports = async function remove(&[name]&, t = undefined) {
  let models = global.app.orm.sequelize.models;
  let dataBase = global.app.orm.sequelize;
  await &[name]&.destroy({transaction: t });
  return {ok:true}
};
