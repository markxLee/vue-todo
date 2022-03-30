import axios from "axios"

const apiData = () => {
    return axios.create({
        baseURL: `http://localhost:8080/`
    })
}

export {apiData};