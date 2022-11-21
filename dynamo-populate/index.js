const dynamoose = require("dynamoose");

// Read file
const fs = require('fs');
const { userSchema } = require("../src/schemas/userSchema");
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Batch write 
const User = dynamoose.model("User", userSchema);

async function writeData() {
    data.forEach(userData => {
        try {
            const user = await User.create(userData); // If a user with `id=1` already exists in the table, an error will be thrown.
            console.log(user);
        } catch (error) {
            console.error(error);
        }
    });
}


writeData()