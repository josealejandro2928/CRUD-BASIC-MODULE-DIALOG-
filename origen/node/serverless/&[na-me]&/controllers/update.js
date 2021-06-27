const connectToDatabase = require('../../db'); // initialize connection
const {
  errorHandler,
  extractHttpMetaFromEvent,
  createHTTPError,
} = require('../../helpers/utils');

// const { mapToDto, &[Name]&Dto } = require('../../dtos/dtos');

module.exports.update = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { &[Name]& } = await connectToDatabase();
    const { pathParameters, body } = extractHttpMetaFromEvent(event);
    const query = {
      include: [
        {
          all: true,
        },
      ],
    };
    let &[name]& = await &[Name]&.findByPk(pathParameters.id || '-1');
    if (!&[name]&) {
      createHTTPError(
        `Sorry, we did not find any &[name]& with id=${pathParameters.id}`,
        404
      );
    }

    let response = {
      statusCode: 201,
      body: {
        data: null,
      },
    };

    await &[name]&.update(body);
    &[name]& = await &[Name]&.findByPk(&[name]&.id, query);
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
