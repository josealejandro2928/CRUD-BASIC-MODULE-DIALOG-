/**
 *
 * @param {*} query
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
 *   data:[{name:'Example1'},{name:'Example2'}]
 *   meta:{
 *    pagination:{
 *          count:20,
 *          total: 100
 *      }
 *   }
 * }
 *
 */

module.exports = async function list(query) {
  query = !query || query.constructor != Object ? {} : query;
  let models = global.app.orm.sequelize.models
  let jsonAPI = global.app.utils.jsonAPI;
  const response = {
    data: [],
    meta: {
      pagination: {
        count: 0,
        total: 0,
      },
    },
  };
  let data = [];
  data = await models.&[Name]&.findAll(query);
  response.data = data;
  response.meta.pagination.count = data.length;
  jsonAPI.cleanQuery(query);
  response.meta.pagination.total = await models.&[Name]&.count(query);
  return response;
};
