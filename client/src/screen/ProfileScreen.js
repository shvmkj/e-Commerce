import React,{useState,useEffect} from 'react'
import { Form, Button, Row ,Col,Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader' 
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import { listMyOrders } from '../actions/orderActions'


const ProfileScreen = ({location,history}) => {
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [message,setMessage] = useState('')
  const dispatch = useDispatch()
  const userDetails = useSelector(state=>state.userDetails)
  const {loading,error,user} = userDetails
  const orderDetails = useSelector(state=>state.listMyOrder)
  const {loading:orderLoading,error:orderError,orders} = orderDetails
  const userUpdateProfile = useSelector(state=>state.userUpdateProfile)
  const {success} = userUpdateProfile
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin
  useEffect(()=>{
    if(!userInfo){
      history.push('/login')
    }else{
      dispatch(listMyOrders())
      if(!user.name){
        dispatch(getUserDetails('profile'))
      }else{
        setName(userInfo.name)
        setEmail(userInfo.email)
      }
    }
  },[history, userInfo ,dispatch, user])
  const submitHandler = (e)=>{
    e.preventDefault()
    if(password===confirmPassword){
      dispatch(updateUserProfile({id : user._id,name,email,password}))
    }
    else{
      setMessage('Password do not match')
    }
  }

  return (
    <Row>
      <Col md={3}>
      <h2>
        USER PROFILE
      </h2>
      {(success&&<Message variant='success'>Profile Updated</Message>) ||
       (message&&<Message variant='danger'>{message}</Message>)
      || (error&&<Message variant='danger'>{error}</Message>)}
      {loading && <Loader></Loader>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>
            Enter Your Name
          </Form.Label>
          <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>
            Email Address
          </Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>
            Confirm Password
          </Form.Label>
          <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          UPDATE
        </Button>
      </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {orderLoading?<Loader/>:orderError?<Message variant='danger'>{error}</Message>:
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL PRICE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order=>(
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0,10)}</td>
                <td>${order.totalPrice}</td>
                <td>{order.isPaid?order.paidAt.substring(0,10):(
                  <i className='fas fa-times' style={{color : 'red'}}></i>
                )}</td>
                <td>{order.isDelivered?order.deliveredAt.substring(0,10):(
                  <i className='fas fa-times' style={{color : 'red'}}></i>
                )}</td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button variant='light' className='btn-sm'>Details</Button>
                </LinkContainer>
              </tr>
            ))}
          </tbody>
        </Table>
        }
      </Col>
      </Row>
  )
}

export default ProfileScreen
