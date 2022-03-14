import Api from "@/services/Api"

export default {
    index() {
        return Api().get('/');
    },
    create(payload) {
        return Api().post('/create', payload);
    },
    delete(payload) {
        return Api().delete('/delete', {data: payload});
    },
    done(payload) {
        return Api().put('/done', payload);
    },
    check(payload) {
        return Api().put('/check', payload);
    },
    pin(payload) {
        return Api().put('/pin', payload);
    }
}