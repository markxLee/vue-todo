import axios from "axios"

const apiData = () => {
    return axios.create({
        baseURL: `http://localhost:8080/`
    })
}

const apiAuth = () => {
    return axios.create({
        baseURL: `http://localhost:8080/auth/`
    })
}
export {apiData, apiAuth};