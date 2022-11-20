'use strict';
const dynamoose = require("dynamoose");

module.exports.lambda_handler = async (event) => {

  console.log("Welcome to serverless-dynamoosejs lambda function!")
  console.log("API Event :: ", event)
  console.log("DynamoDB Table Name :: ", process.env.USERS_TABLE_NAME)

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
