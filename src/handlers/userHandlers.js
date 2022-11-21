const { getUserModel } = require("../db/models/userSchema")

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
            dbModel = getUserModel(process.env.USERS_TABLE_NAME)
        }
    } catch (error) {
        const errString = `Unable to create dynamoDB user model:: ${JSON.stringify(error)}`
        console.error(errString)
        return {
            statusCode: null, body: null, err: {
                statusCode: 500,
                message: errString
            }
        }
    }

    let results = null
    try {
        // Query using model
        results = await dbModel.query("id").contains(userId).exec() // will query all items where the hashKey `breed` contains `Terrier`    
        console.log("Total items found :: ", results.len)
        console.log("Result item ::  ", results[0])

        return {
            statusCode: 200,
            body: results[0],
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


    // If found return

    // Else return null
}

const fetchUsers = (queryStringParameters, pathParameters, isBase64Encoded) => {
    // TODO :: Extract querys params
}

module.exports = {
    fetchUserDetails,
    fetchUsers
}