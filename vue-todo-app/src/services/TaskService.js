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

export async function createTaskServer(data) {
    const response = await axios.post(`/api/task`, {task: data}).catch(function (error) {
        console.log(error);
        return false
    });
    if(response.status === 201) {
        return response.data
    }
    else return false
}

export async function createTasksServer(data) {
    const response = await axios.post(`/api/tasks`, {tasks: data}).catch(function (error) {
        console.log(error);
        return false
    });
    if(response.status === 201) {
        return response.data
    }
    else return false
}

export async function updateTaskServer(id, data) {
    const response = await axios.patch(`/api/task/${id}`, {task: data}).catch(function (error) {
        console.log(error);
        return false
    });
    if(response.status === 201) {
        return response.data
    }
    else return false
}

export async function deleteTaskServer(id) {
    const response = await axios.delete(`/api/task/${id}`).catch(function (error) {
        console.log(error);
        return false
    });
    if(response.status === 200) {
        return true
    }
    else return false
}