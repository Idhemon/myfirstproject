import axios from "axios"
import {config} from "../config"
const token = window.localStorage.getItem('ggg-token')



//Function to add a new owner
export const addUserProgram =(datas) => {
    return axios.post(`${config.api_url}/api/userProgram/add`, datas, {headers: {'x-access-token': token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=> {
        console.error('Erreur dans addUserProgram:', err)
        return err})
}

//Function to check owned status
export const getUserProgram =(datas) => {
    const params = {
        userId : datas.userId,
        programId : datas.programId
    }
    return axios.get(`${config.api_url}/api/userProgram/owner`, {headers: {'x-access-token': token}, params : params})
    .then((res)=> {
            if(res.data.isOwned && res.data.isOwned.owned === "true"){
                return true
            }
            return false
    })
    .catch(err=> {
        console.error('Erreur lors de la vérification de l\'état "possédé":', err)
        return false})
}