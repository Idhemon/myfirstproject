import axios from "axios"
import {config} from "../config"
const token = window.localStorage.getItem('ggg-token')


// Function to get the exercises list
export const displayExercises = (programId) => {
    return axios.get(`${config.api_url}/api/exercises/${programId}`, {headers: {'x-access-token':token}})
    .then((res)=> {
        return res.data
        
    })
    .catch(err=>err)
}


// Function to get one exercise
export const onlyOneExercise = (id) => {
    return axios.get(`${config.api_url}/api/exercise/${id}`, {headers: {'x-access-token':token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}


// Function to add one exercise
export const saveOneExercise = (datas, programId) => {
    return axios.post(`${config.api_url}/api/exercise/save/${programId}`, datas, {headers: {'x-access-token':token}})
    .then((res)=> {
        return res.data
    })
    .catch(err => {
        return err})
}


// Function to update one exercise
export const updateOneExercise = (datas, exerciseId) => {
    return axios.put(`${config.api_url}/api/exercise/update/${exerciseId}`, datas, {headers: {'x-access-token':token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}

//Function to delete one exercise
export const deleteOneExercise = (id) => {
    return axios.delete(`${config.api_url}/api/exercise/delete/${id}`, {headers: {'x-access-token':token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}