import axios from "axios"
import {config} from "../config"
const token = window.localStorage.getItem('ggg-token')


// Function to get the users list
export const displayUsers = () => {
    return axios.get(`${config.api_url}/api/users`, {headers: {'x-access-token':token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}


// Function to get one user
export const onlyOneUser = (id) => {
    return axios.get(`${config.api_url}/api/user/${id}`, {headers: {'x-access-token':token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}


// Function to add one user
export const saveOneUser = (datas) => {
    return axios.post(`${config.api_url}/api/user/save`, datas)
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}


// Function to log in one user
export const loginOneUser = (datas) => {
    return axios.post(`${config.api_url}/api/user/login`, datas)
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}


// Function to update one user
export const updateOneUser = (datas) => {
    return axios.put(`${config.api_url}/api/user/update`, datas, {headers: {'x-access-token':token}})
    .then((res)=> {
        return res.data
    })
    .catch(err => {
        return err
    })
}


// Function to delete one user
export const deleteOneUser = () => {
    return axios.delete(`${config.api_url}/api/user/delete`, {headers: {'x-access-token':token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}


// Function to verify and reconnect a user
export const verifToken = () => {
    return axios.get(`${config.api_url}/api/user/verifToken`, {headers: {'x-access-token':token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}
