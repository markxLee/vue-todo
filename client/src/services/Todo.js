import Api from "@/services/Api"

export default {
    index() {
        return Api().get('/');
    },
    create(payload) {
        return Api().post('/create', payload);
    },
    delete(payload) {
        return Api().delete('/delete', payload);
    },
    check(payload) {
        return Api().post('/check', payload);
    },
    done(payload) {
        return Api().put('/done', payload);
    },
    pin(payload) {
        return Api().post('/pin', payload);
    }
}