const connectToDatabase = require('../../db'); // initialize connection
const {
  errorHandler,
  extractHttpMetaFromEvent,
  createHTTPError,
} = require('../../helpers/utils');

module.exports.delete = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { &[Name]& } = await connectToDatabase();
    const { pathParameters } = extractHttpMetaFromEvent(event);

    let &[name]& = await &[Name]&.findByPk(pathParameters.id || '-1');
    
    if (!&[name]&) {
      createHTTPError(
        `Sorry, we did not find any &[name]& with id=${pathParameters.id}`,
        404
      );
    }
    ////  YOU SHOULD VERIFIY IF THIS MODEL CAN BE DELETE, USE SOFT OR HARD ITS MUST BE 
    //// DISSCUSED 
    let response = {
      statusCode: 204,
      body: {
        data: 'Deleted succefully',
      },
    };
    await &[name]&.destroy();
    //////////BEFORE RETURNING CONVERT INTO STRING THE BODY////////
    response.body = JSON.stringify(response.body);
    callback(null, response);
  } catch (error) {
    let response = errorHandler(error, error.status, true);
    callback(null, response);
  }
};
