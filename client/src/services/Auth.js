import {apiAuth} from "@/services/Api"

export default {
    login(payload) {
        return apiAuth().post('/login', payload);
    },
    logout(payload) {
        return apiAuth().delete('/logout', payload);
    },
    token(payload) {
        return apiAuth().post('/token', {data: payload});
    },
}