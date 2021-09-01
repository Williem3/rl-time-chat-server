const cUsers = [];

function joinUser(id, username, room) {
    const pUser = { id, username, room };

    cUsers.push(pUser);
    console.log(cUsers, "users");

    return pUser;
}

console.log("user out", cUsers);

function getCurrentUser(id) {
    return cUsers.find((pUser) => pUser.id === id);
}


function userDisconnect(id) {
    const index = cUsers.findIndex((pUser) => pUser.id === id);

    if (index !== -1) {
        return cUsers.splice(index, 1)[0];
    }
}


module.exports = {
    joinUser,
    getCurrentUser,
    userDisconnect
}