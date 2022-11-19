'use strict';

module.exports.lambda_handler = async (event) => {

  console.log("Welcome to serverless-dynamoosejs-get lambda function!")
  console.log("Event :: ", event)

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
