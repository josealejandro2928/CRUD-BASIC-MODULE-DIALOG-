const connectToDatabase = require('../../db'); // initialize connection
const {
  errorHandler,
  createHTTPError,
  extractHttpMetaFromEvent,
} = require('../../helpers/utils');

// const { mapToDto, &[Name]&Dto } = require('../../dtos/dtos');

module.exports.create = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { &[Name]& } = await connectToDatabase();
    const { body } = extractHttpMetaFromEvent(event);
    let response = {
      statusCode: 201,
      body: {
        data: null,
      },
    };
    ///////HERE EXCECUTE SOME VALIDATIONS FOR TGHE SCHEMA/////
    //////OR USE SOME NPM PACKAGE FOR VALIDATING A JSON FIELDS
    // if (!body.name) {
    //   createHTTPError('Name is required', 400);
    // }

    /////////////////////////////////////////////////////
   
    //////DO SOME STUFF//////
    let &[name]& = await &[Name]&.create(body);

    ///CREATE A DTO CLASS TO MAP THE DATA TO CLIENT SIDE
    // response.body.data = mapToDto(&[name]&, &[Name]&Dto);
    response.body.data = &[name]&;
    ////////////////////////
    //////////BEFORE RETURNING CONVERT INTO STRING THE BODY////////
    response.body = JSON.stringify(response.body);
    callback(null, response);
  } catch (error) {
    let response = errorHandler(error, error.status, true);
    callback(null, response);
  }
};
