import { base_url } from './base_url'
import commonApi from './commonApi'

export const getAllTasks = async () => {
    return await commonApi('GET', `${base_url}/task`, '')
}

export const addNewTask = async (data) => {
    return await commonApi('POST', `${base_url}/task`, data)
}

export const getSpecificTask = async (id) => {
    return await commonApi('GET', `${base_url}/task/${id}`, '')
}
export const markAsCompleted = async (id, data) => {
    return await commonApi('PUT', `${base_url}/task/${id}`, data)
}

export const deleteTask = async (id) => {
    return await commonApi('DELETE', `${base_url}/task/${id}`, {})
}