/**
 * @param {*} id
 * @param query
 * {
 *    where:{
 *      id: {
 *        [Op.in]:[1,2,3]
 *      }
 *    },
 *    include:[
 *      {
 *          model:ExampleModel
 *      }
 *    ]
 *
 * }
 *
 * @returns
 * {
 *   {data:{name:'Example1'}}
 * }
 *
 */

module.exports = async function listOne(id, query = {}) {
  let models = global.app.orm.sequelize.models;
  const response = {
    data: {},
  };
  let data = [];
  if (!query.where) {
    query.where = { id: id };
  } else {
    query.where.id = id;
  }
  data = await models.&[Name]&.findOne(query);
  response.data = data;
  return response;
};
