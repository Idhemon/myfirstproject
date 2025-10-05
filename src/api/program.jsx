import axios from "axios"
import {config} from "../config"
const token = window.localStorage.getItem('ggg-token')


// Function to get the programs list with exercises
export const displayOnlyPrograms = () => {
    return axios.get(`${config.api_url}/api/onlyprograms`)
    .then((res)=> {
        return res.data
        
    })
    .catch(err=>err)
}


// Function to get the programs list with exercises
export const displayPrograms = (token) => {
    return axios.get(`${config.api_url}/api/programs`, {headers: {'x-access-token': token}})
    .then((res)=> {
        return res.data
        
    })
    .catch(err=>err)
}


// Function to get one program
export const onlyOneProgram = (id, token) => {
    return axios.get(`${config.api_url}/api/program/${id}`, {headers: {'x-access-token': token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}


// Function to add one program
export const saveOneProgram = (datas, token) => {
    return axios.post(`${config.api_url}/api/program/save`, datas, {headers: {'x-access-token':token}})
    .then((res)=> {
        return res.data
    })
    .catch(err => {
        return err})
}


// Function to update one program
export const updateOneProgram = (datas, id) => {
    return axios.put(`${config.api_url}/api/program/update/${id}`, datas, {headers: {'x-access-token':token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}


//Function to delete one program
export const deleteOneProgram = (id) => {
    return axios.delete(`${config.api_url}/api/program/delete/${id}`, {headers: {'x-access-token':token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}
