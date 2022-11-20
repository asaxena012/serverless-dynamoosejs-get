import { fetchUserDetails, fetchUsers } from "../handlers/userHandlers";

export const APIResources = {
    FetchUserDetails: {
        Resource: "/service/v1/user/{id}",
        Method: "GET",
        Handler: fetchUserDetails
    },
    FetchUsers: {
        Resource: "/service/v1/user",
        Method: "GET",
        Handler: fetchUsers
    }
}