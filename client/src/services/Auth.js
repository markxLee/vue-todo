import {apiAuth} from "@/services/Api"

export default {
    login(payload) {
        return apiAuth().post('/login', payload);
    },
    logout(payload) {
        return apiAuth().delete('/logout', {headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.accessToken}`
            }
        });
    },
    token(payload) {
        return apiAuth().post('/token', {data: payload});
    },
}