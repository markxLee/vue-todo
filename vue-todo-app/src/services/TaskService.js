const axios = require('axios');

export async function getAllTasks() {

    const response = await axios.get('/api/list-tasks');
    return response.data;
}

export async function createUser(data) {
    const response = await axios.post(`/api/user`, {user: data});
    return response.data;
}