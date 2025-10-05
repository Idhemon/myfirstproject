import axios from "axios"
import {config} from "../config"
const token = window.localStorage.getItem('ggg-token')


// Function to get the orders list
export const displayOrders = () => {
    return axios.get(`${config.api_url}/api/orders`, {headers: {"x-access-token": token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}


// Function to get one order details
export const onlyOneOrder = (id) => {
    return axios.get(`${config.api_url}/api/order/${id}`, {headers: {"x-access-token": token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}


// Function to save one order
export const saveOneOrder = (datas) => {
    return axios.post(`${config.api_url}/api/order/save`, datas, {headers: {"x-access-token": token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=> {
        console.error(err)
        throw err
        
    })
}


// Function to check the payment
export const proceedPayment = (datas) => {
    return axios.post(`${config.api_url}/api/order/payment`, datas, {headers: {"x-access-token": token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=> {
        console.error(err)
        throw err
        
    })
}


// Function to update order status
export const updateOrderStatus = (datas) => {
    return axios.put(`${config.api_url}/api/order/status`, datas, {headers: {"x-access-token": token}})
    .then((res)=> {
        return res.data
    })
    .catch(err=>err)
}
