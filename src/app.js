'use strict';
const { APIResources } = require("./api/api");
let dbModel = null

module.exports.lambda_handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = true;

  console.log("Welcome to serverless-dynamoosejs lambda function!")
  console.log("API Event :: ", event)
  console.log("DynamoDB Table Name :: ", process.env.USERS_TABLE_NAME)

  const { queryStringParameters, pathParameters, isBase64Encoded } = event

  const apiHandler = getAPIHandler(event)

  const { statusCode, body, err } = await apiHandler(queryStringParameters, pathParameters, isBase64Encoded, dbModel, callback)

  if (err != null) {
    callback(null, {
      statusCode: err.statusCode,
      body: JSON.stringify(
        {
          message: err.message,
        },
        null,
        2
      ),
    })
    return;
  }

  console.log("Callback:: ", {
    statusCode: statusCode,
    body: JSON.stringify(
      body,
      null,
      2
    ),
  })

  callback(null, {
    statusCode: statusCode,
    body: JSON.stringify(
      body,
      null,
      2
    ),
  })
  return;
};

const getAPIHandler = (apiEvent) => {
  return APIResources[apiEvent.resource]?.Handler
}