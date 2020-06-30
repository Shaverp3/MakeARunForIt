const remoteURL = "http://localhost:8088"

const UserManager = {

    filterGetAll(email, password) {
        return fetch(`${remoteURL}/users?email=${email}&password=${password}`)
            .then(result => result.json())
    },

    getAll() {
        return fetch(`${remoteURL}/users`)
            .then(result => result.json())
    },

    post(newUser) {
        return fetch(`${remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        }).then(data => data.json())
    }

}

export default UserManager