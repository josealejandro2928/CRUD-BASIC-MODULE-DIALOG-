const connectToDatabase = require('../../db'); // initialize connection
const {
  errorHandler,
  buildObjectSequelizeQuery,
} = require('../../helpers/utils');

// const { mapToDto, &[Name]&Dto } = require('../../dtos/dtos');

module.exports.list = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { &[Name]& } = await connectToDatabase();
    const query = buildObjectSequelizeQuery(event);
    let response = {
      statusCode: 200,
      body: {
        data: [],
        meta: {
          count: 0,
          total: 0,
        },
      },
    };
    //////DO SOME STUFF//////
    let all&[Name]&s = [];
    all&[Name]&s = await &[Name]&.findAll(query);
    delete query.offset;
    delete query.limit;
    let total = await &[Name]&.count(query);

    ///CREATE A DTO CLASS TO MAP THE DATA TO CLIENT SIDE
    // response.body.data = mapToDto(all&[Name]&s, &[Name]&Dto);
    response.body.data = all&[Name]&s
    response.body.meta.count = all&[Name]&s.length;
    response.body.meta.total = total;
    ////////////////////////
    //////////BEFORE RETURNING CONVERT INTO STRING THE BODY////////
    response.body = JSON.stringify(response.body);
    callback(null, response);
  } catch (error) {
    let response = errorHandler(error, error.status, true);
    callback(null, response);
  }
};
