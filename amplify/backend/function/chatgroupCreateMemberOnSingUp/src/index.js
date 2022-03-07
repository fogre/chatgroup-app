/* Amplify Params - DO NOT EDIT
	API_CHATGROUP_GRAPHQLAPIIDOUTPUT
	API_CHATGROUP_MEMBERTABLE_ARN
	API_CHATGROUP_MEMBERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk');
const ddb = new aws.DynamoDB();

const randomFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

exports.handler = async (event, context) => {
    
  let date = new Date();
  const hue = randomFromInterval(150, 270);
  const saturation = randomFromInterval(10, 35);
  const hslString = `hsl(${hue},${saturation}%,45%)`;

  if (event.request.userAttributes.sub) {
    let params = {
        Item: {
          'id': {S: event.request.userAttributes.sub},
          'owner': {S: event.userName},
          '__typename': {S: 'Member'},
          'username': {S: event.userName},
          'createdAt': {S: date.toISOString()},
          'updatedAt': {S: date.toISOString()},
          'avatarColor': {S: hslString}
        },
        TableName: process.env.API_CHATGROUP_MEMBERTABLE_NAME
      };

      // Call DynamoDB
      try {
          const res = await ddb.putItem(params).promise()
          console.log("Success");
      } catch (err) {
          console.log("Error here", err);
      }

      context.done(null, event);

  } else {
      // Nothing to do, the user's email ID is unknown
      console.log("Error: Nothing was written to DynamoDB");
      context.done(null, event);
  }
};