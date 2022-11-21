const dynamoose = require("dynamoose");

// Read file
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('dynamo-populate/data.json', 'utf8'));

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

// Batch write 
const User = dynamoose.model("staging-usersTable", userSchema, {
    "create": false,
    "waitForActive": false
});

(async () => {
    data.forEach(async userData => {
        try {
            const user = await User.create(userData); // If a user with `id=1` already exists in the table, an error will be thrown.
            console.log(user);
        } catch (error) {
            console.error(error);
        }
    });
})()

