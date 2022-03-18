const axios = require('axios');

export async function loginUser(id, password) {
    const response = await axios.post(`/api/users/login`, {userName: id, password: password}).catch(function (error) {
        console.log(error);
        return false
    });
    if(response.status === 200) {
        return response.data.userData
    }
    else return false
}

export async function authUser() {
    const response = await axios.get(`/api/users/auth`).catch(function (error) {
        console.log(error);
        return false
    });
    if(response.status === 200) {
        return response.data
    }
    else return false
}

export async function logoutUser() {
    const response = await axios.get(`/api/users/logout`).catch(function (error) {
        console.log(error);
        return false
    });
    if(response.status === 200) {
        return true
    }
    else return false
}

export async function registerUser(data) {
    const response = await axios.post(`/api/users/register`, {user: data}).catch(function (error) {
        console.log(error);
        return false
    });
    if(response.status === 201) {
        return response.data
    }
    else return false
}

