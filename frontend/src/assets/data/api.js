import axios from "axios";

const URL = "http://localhost:3000"

export async function getItems() {
    //"http://localhost:3000/posts"
    const response = await axios.get(`${URL}/ah`)

    if (response.status === 200) {
        return response.data
    } else {
        return
    }
}

export async function getItem(id) {
    //"http://localhost:3000/ah/12345"
    const response = await axios.get(`${URL}/ah/${id}`)

    if (response.status === 200) {
        return response.data
    } else {
        return
    }
}

export async function createItem(post) {
    //"http://localhost:3000/ah/"
    const response = await axios.post(`${URL}/ah/`, post)
    return response
}

export async function updateItem(id, post) {
    //"http://localhost:3000/ah/12345"
    const response = await axios.put(`${URL}/ah/${id}`, post)
    return response
}

export async function deleteItem(id) {
    //"http://localhost:3000/ah/12345"
    const response = await axios.delete(`${URL}/ah/${id}`)
    return response
}