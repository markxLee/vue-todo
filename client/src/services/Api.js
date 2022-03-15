import axios from "axios"

const apiData = () => {
    return axios.create({
        baseURL: `http://localhost:8081/mongodb`
    })
}

const apiAuth = () => {
    return axios.create({
        baseURL: `http://localhost:5000/auth`
    })
}
export {apiData, apiAuth}