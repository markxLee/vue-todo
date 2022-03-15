import {apiData} from "@/services/Api"

export default {
    index(payload) {
        return apiData().get('/', {headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.accessToken}`
            }
        });
    },
    create(payload) {
        return apiData().post('/create', payload);
    },
    delete(payload) {
        return apiData().delete('/delete', {data: payload});
    },
    done(payload) {
        return apiData().put('/done', payload);
    },
    check(payload) {
        return apiData().put('/check', payload);
    },
    pin(payload) {
        return apiData().put('/pin', payload);
    }
}