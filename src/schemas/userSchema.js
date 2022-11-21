const dynamoose = require("dynamoose");

const userSchema = new dynamoose.Schema({
    "id": Number,
    "firstName": String,
    "lastName": String,
    "email": String,
    "gender": {
        "type": String,
        "enum": ['Female', 'Genderfluid', 'Male', 'Polygender', 'Bigender', 'Agender', 'Non-binary', 'Genderqueer']
    },
    "ipAddress": String,
    "dateJoined": Number,
}, {
    "saveUnknown": false,
    "timestamps": true
});

module.exports = { userSchema }