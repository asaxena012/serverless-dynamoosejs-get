// const { getUserModel } = require("../db/models/userSchema.js")
const dynamoose = require("dynamoose");
const { dateIsValid } = require("../helper");

const userSchema = new dynamoose.Schema({
    "id": {
        type: Number,
        hashKey: true,
        required: true,
    },
    "firstName": String,
    "lastName": String,
    "email": String,
    "gender": {
        "type": String,
        "enum": ['Female', 'Genderfluid', 'Male', 'Polygender', 'Bigender', 'Agender', 'Non-binary', 'Genderqueer']
    },
    "ipAddress": String,
    "dateJoined": {
        type: Number,
        required: true,
        index: {
            name: "DateJoinedIndex",
            global: true
        },
    }

}, {
    "saveUnknown": false,
    "timestamps": true
});

const getUserModel = (tableName) => {
    return dynamoose.model(tableName, userSchema, {
        "create": false,
        "waitForActive": false
    });
}

const fetchUserDetails = async (queryStringParameters, pathParameters, isBase64Encoded, dbModel) => {
    const { id: userId } = pathParameters

    if (!userId) {
        const errString = "User Id not found path parameters"
        console.error(errString)
        return {
            statusCode: null, body: null, err: {
                statusCode: 400,
                message: errString
            }
        }
    }

    try {
        // Create and return model 
        if (!dbModel) {
            console.log("model: ", userId)
            dbModel = getUserModel(process.env.USERS_TABLE_NAME)
        }
    } catch (error) {
        const errString = `Unable to create dynamoDB user model:: ${JSON.stringify(error)}`
        console.error(errString)
        return ({
            statusCode: null, body: null, err: {
                statusCode: 500,
                message: errString
            }
        }, null)
    }

    let results = null
    try {
        // Query using model
        console.log("Calling get: ", userId)
        results = await dbModel.get(parseInt(userId)) // will query all items where the hashKey `breed` contains `Terrier`    
        const result = { ...results }
        console.log("Result item ::  ", result)

        return {
            statusCode: 200,
            body: result,
            err: null
        }
    } catch (error) {
        const errString = `Unable to query dynamoDB user table :: ${JSON.stringify(error)}`
        console.error(errString)
        return {
            statusCode: null, body: null, err: {
                statusCode: 500,
                message: errString
            }
        }
    }

    // Else return null
}

const fetchUsers = async (queryStringParameters, pathParameters, isBase64Encoded, dbModel) => {
    const { joinedDate } = queryStringParameters

    if (!joinedDate || !dateIsValid(joinedDate)) {
        const errString = "User joining date string (YYYY-MM-DD) not found in path parameters"
        console.error(errString)
        return {
            statusCode: null, body: null, err: {
                statusCode: 400,
                message: errString
            }
        }
    }

    const date = new Date(joinedDate);

    const startDateTs = date.getTime() / 1000;
    const endDateTs = startDateTs + 86400;

    try {
        // Create and return model 
        if (!dbModel) {
            dbModel = getUserModel(process.env.USERS_TABLE_NAME)
        }
    } catch (error) {
        const errString = `Unable to create dynamoDB user model:: ${JSON.stringify(error)}`
        console.error(errString)
        return ({
            statusCode: null, body: null, err: {
                statusCode: 500,
                message: errString
            }
        }, null)
    }

    let results = null
    try {
        // Query using model
        console.log("StartDate:: ", typeof startDateTs)
        console.log("EndDate:: ", typeof endDateTs)
        results = await dbModel.query("dateJoined").between(startDateTs, endDateTs).using("DateJoinedIndex").exec();
        // results = await dbModel.get(parseInt(userId)) // will query all items where the hashKey `breed` contains `Terrier`    
        const result = { ...results }
        console.log("Result item ::  ", results)

        return {
            statusCode: 200,
            body: result,
            err: null
        }
    } catch (error) {
        const errString = `Unable to query dynamoDB user table :: ${JSON.stringify(error)}`
        console.error(errString)
        return {
            statusCode: null, body: null, err: {
                statusCode: 500,
                message: errString
            }
        }
    }

    // Else return null
}

module.exports = {
    fetchUserDetails,
    fetchUsers
}