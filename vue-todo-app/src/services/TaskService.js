const axios = require('axios');
import { getData, addData, updateData, deleteData } from '../database/queriesFirestore.js';

export const getTasks = async () => {
    return await getData('tasks');
}

export const addTask = async (data) => {
    return await addData('tasks', data);
}

export const updateTask = async (id,data) => {
    return await updateData('tasks', id, data);
}

export const deleteTask = async (id) => {
    return await deleteData('tasks', id);
}

export async function getAllTasks() {

    const response = await axios.get('/api/list-tasks');
    return response.data;
}

export async function createUser(data) {
    const response = await axios.post(`/api/user`, {user: data});
    return response.data;
}