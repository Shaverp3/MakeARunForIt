const remoteURL = "http://localhost:8088"

const DistanceManager = {
  get(id) {
    return fetch(`${remoteURL}/distances/${id}`).then(result => result.json())
  },
  getAll() {
    //refactor this fetch call to ask for animals that match the logged in users id
    return fetch(`${remoteURL}/distances`).then(result => result.json())
  },
  delete(id) {
    return fetch(`${remoteURL}/distances/${id}`, {
      method: "DELETE"
    })
      .then(result => result.json())
  },
  post(newDistance) {
    //refactor this fetch call to make sure the new animal has the employeesId of the logged in user
    return fetch(`${remoteURL}/distances`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDistance)
    }).then(data => data.json())
  },

  update(editedDistance) {
    //refactor this fetch call to make sure the edited animal has the employeesId of the logged in user
    return fetch(`${remoteURL}/races/${editedDistance.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedDistance)
    }).then(data => data.json());
  },

  patch(editedDistance) {
    return fetch(`${remoteURL}/animals/${editedDistance.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name: `${editedDistance.name}`})
      }).then(data => data.json());
}

}

export default DistanceManager