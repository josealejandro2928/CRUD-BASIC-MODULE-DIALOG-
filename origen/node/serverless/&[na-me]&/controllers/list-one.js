const connectToDatabase = require('../../db'); // initialize connection
const {
  errorHandler,
  extractHttpMetaFromEvent,
  createHTTPError,
} = require('../../helpers/utils');

// const { mapToDto, &[Name]&Dto } = require('../../dtos/dtos');

module.exports.listOne = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { &[Name]& } = await connectToDatabase();
    const { pathParameters } = extractHttpMetaFromEvent(event);
    const query = {
      include: [
        {
          all: true,
        },
      ],
    };
    let &[name]& = await &[Name]&.findByPk(pathParameters.id || '-1', query);
    if (!&[name]&) {
      createHTTPError(
        `Sorry, we did not find any &[name]& with id=${pathParameters.id}`,
        404
      );
    }
    // query.logging = true;
    let response = {
      statusCode: 200,
      body: {
        data: null,
      },
    };
    
    ///CREATE A DTO CLASS TO MAP THE DATA TO CLIENT SIDE
    // response.body.data = mapToDto(&[name]&, &[Name]&Dto);
    response.body.data = &[name]&;
    //////////BEFORE RETURNING CONVERT INTO STRING THE BODY////////
    response.body = JSON.stringify(response.body);
    callback(null, response);
  } catch (error) {
    let response = errorHandler(error, error.status, true);
    callback(null, response);
  }
};
