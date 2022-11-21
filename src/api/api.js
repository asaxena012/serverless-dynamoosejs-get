const { fetchUserDetails, fetchUsers } = require("../handlers/userHandlers")

const APIResources = {
    "/service/v1/user/{id}": {
        Resource: "/service/v1/user/{id}",
        Method: "GET",
        Handler: fetchUserDetails
    },
    "/service/v1/user": {
        Resource: "/service/v1/user",
        Method: "GET",
        Handler: fetchUsers
    }
}

module.exports = { APIResources }