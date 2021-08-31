import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, 
  ORDER_DELIVER_FAIL, 
  ORDER_DELIVER_REQUEST, 
  ORDER_DELIVER_SUCCESS, 
  ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, 
  ORDER_GET_FAIL, 
  ORDER_GET_REQUEST, 
  ORDER_GET_SUCCESS, 
  ORDER_MY_LIST_FAIL, ORDER_MY_LIST_REQUEST, ORDER_MY_LIST_SUCCESS,
  ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/orderConstants";
import axios from "axios";
export const createOrder = (order)=>async(dispatch,getState)=>{
  try{
    dispatch({
      type: ORDER_CREATE_REQUEST
    })
    const {userLogin : {userInfo}} = getState()
    const config = {
      headers :{
        'Content-Type' : 'application/json',
        Authorization : `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.post(`/api/orders/`,order,config)
    console.log(data)
    dispatch({
      type:ORDER_CREATE_SUCCESS,
      payload : data
    })
  }catch(error){ 
    dispatch({
      type : ORDER_CREATE_FAIL,
      payload:error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
} 
export const getOrderDetails = (id)=>async(dispatch,getState)=>{
  try{
    dispatch({
      type: ORDER_DETAILS_REQUEST
    })
    const {userLogin : {userInfo}} = getState()
    const config = {
      headers :{
        Authorization : `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.get(`/api/orders/${id}`,config)
    console.log(data)
    dispatch({
      type:ORDER_DETAILS_SUCCESS,
      payload : data
    })
  }catch(error){ 
    dispatch({
      type : ORDER_DETAILS_FAIL,
      payload:error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
} 
export const payOrder = (orderId,paymentResult)=>async(dispatch,getState)=>{
  try{
    dispatch({
      type: ORDER_PAY_REQUEST
    })
    const {userLogin : {userInfo}} = getState()
    const config = {
      headers :{
        'Content-Type' : 'application/json',
        Authorization : `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.put(`/api/orders/${orderId}/pay`,paymentResult,config)
    console.log(data)
    dispatch({
      type:ORDER_PAY_SUCCESS,
      success: true
    })
  }catch(error){ 
    dispatch({
      type : ORDER_PAY_FAIL,
      success:false,
      payload:error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
} 
export const listMyOrders = ()=>async(dispatch,getState)=>{
  try{
    dispatch({
      type: ORDER_MY_LIST_REQUEST
    })
    const {userLogin : {userInfo}} = getState()
    const config = {
      headers :{
        Authorization : `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.get(`/api/orders/myorders`,config)
    console.log(data)
    dispatch({
      type:ORDER_MY_LIST_SUCCESS,
      payload : data
    })
  }catch(error){ 
    dispatch({
      type : ORDER_MY_LIST_FAIL,
      success:false,
      payload:error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
} 
export const listAllOrders = ()=>async(dispatch,getState)=>{
  try{
    dispatch({
      type: ORDER_GET_REQUEST
    })
    const {userLogin : {userInfo}} = getState()
    const config = {
      headers :{
        Authorization : `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.get(`/api/orders/`,config)
    console.log(data)
    dispatch({
      type:ORDER_GET_SUCCESS,
      payload : data,success:true
    })
  }catch(error){ 
    dispatch({
      type : ORDER_GET_FAIL,
      success:false,
      payload:error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
} 
export const orderDeliver = (order)=>async(dispatch,getState)=>{
  try{
    dispatch({
      type: ORDER_DELIVER_REQUEST
    })
    const {userLogin : {userInfo}} = getState()
    const config = {
      headers :{
        Authorization : `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.put(`/api/orders/${order._id}/deliver`,{},config)
    console.log(data)
    dispatch({
      type:ORDER_DELIVER_SUCCESS,
      success:true
    })
  }catch(error){ 
    dispatch({
      type : ORDER_DELIVER_FAIL,
      success:false,
      payload:error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
} 