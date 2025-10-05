import axios from "axios"
import {config} from "../config"
const token = window.localStorage.getItem('ggg-token')

// Function to get the requests list to contact
export const displayContacts = () => {
    return axios.get(`${config.api_url}/api/contact/list`, {headers: {'x-access-token':token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}


// Function to get one request to contact
export const onlyOneContact = (id) => {
    return axios.get(`${config.api_url}/api/contact/list/${id}`, {headers: {'x-access-token':token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}


// Function to save one request to contact
export const saveOneRequest = (datas) => {
    return axios.post(`${config.api_url}/api/contact/send`, datas)
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}


// Function to update one request (status)
export const updateOneRequest = (datas, id) => {
    return axios.put(`${config.api_url}/api/contact/update/${id}`, datas, {headers: {'x-access-token':token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}


// Function to delete one request
export const deleteOneRequest = (id) => {
    return axios.delete(`${config.api_url}/api/contact/delete/${id}`, {headers: {'x-access-token':token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}