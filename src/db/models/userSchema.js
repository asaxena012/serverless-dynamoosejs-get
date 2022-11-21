const dynamoose = require("dynamoose");

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


module.exports = { getUserModel }