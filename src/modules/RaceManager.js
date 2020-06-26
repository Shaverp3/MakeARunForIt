const remoteURL = "http://localhost:8088"

const RaceManager = {
  get(id) {
    return fetch(`${remoteURL}/races/${id}`).then(result => result.json())
  },
  getAll() {
    //refactor this fetch call to ask for animals that match the logged in users id
    return fetch(`${remoteURL}/races`).then(result => result.json())
  },
  delete(id) {
    return fetch(`${remoteURL}/races/${id}`, {
      method: "DELETE"
    })
      .then(result => result.json())
  },
  post(newRace) {
    //refactor this fetch call to make sure the new animal has the employeesId of the logged in user
    return fetch(`${remoteURL}/races`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newRace)
    }).then(data => data.json())
  },

  update(editedRace) {
    //refactor this fetch call to make sure the edited animal has the employeesId of the logged in user
    return fetch(`${remoteURL}/races/${editedRace.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedRace)
    }).then(data => data.json());
  },

  patch(editedRace) {
    return fetch(`${remoteURL}/animals/${editedRace.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name: `${editedRace.name}`})
      }).then(data => data.json());
  },

  getWithDistance(id) {
    return fetch(`${remoteURL}/races/${id}?_expand=distance`)
      .then(result => result.json())
}

}

export default RaceManager