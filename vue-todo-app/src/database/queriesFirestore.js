import db from '../firestore.js';

export const getData = async (collection) => {
    return await new Promise(resolve => {
        db.collection(collection)
            .onSnapshot(snapshotChange => {
                let data = [];
                snapshotChange.forEach((doc) => {
                    data.push({
                        ...doc.data(),
                        id: doc.id,
                    })
                    resolve(data);
                });
            })
    })
}

export const addData = async (collection,document) => {
    return await new Promise((resolve,reject) => {
        db.collection(collection).add(document)
            .then(function(doc) {
                resolve(doc.id);
            })
            .catch(function(error) {
                reject(error);
            });
    })
}

export const updateData = async (collection,id,document) => {
    return await new Promise((resolve,reject) => {
        db.collection(collection).doc(id).update(document)
            .then(function(res) {
                console.log(res)
                resolve(true);
            })
            .catch(function(error) {
                console.log(error)
                reject(false);
            });
    })
}

export const deleteData = async (collection,id) => {
    return await new Promise((resolve,reject) => {
        db.collection(collection).doc(id).delete()
            .then(function(res) {
                console.log(res)
                resolve(true);
            })
            .catch(function(error) {
                console.log(error)
                reject(false);
            });
    })
}