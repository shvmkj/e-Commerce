import React,{useState,useEffect} from 'react'
import { Row ,Col,ListGroup,Image,Card, Button} from 'react-bootstrap'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {PayPalButton} from 'react-paypal-button-v2'
import { getOrderDetails,payOrder,orderDeliver } from '../actions/orderActions'
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET } from '../constants/orderConstants'
const OrderScreen = ({match,history}) => {
  const orderId = match.params.id
  const orderDetails = useSelector(state=>state.orderDetails)
  const {loading,error,order} = orderDetails
  const orderPay = useSelector(state=>state.orderPay)
  const {loading:loadingPay,success:successPay} = orderPay
  const orderDeliverd = useSelector(state=>state.orderDeliver)
  const {loading:loadingDeliver,success:successDeliver} = orderDeliverd
  const [sdkReady,setSdkReady] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state=>state.userLogin)
  const{userInfo} = user
  useEffect(()=>{
    if(!userInfo){
      history.push('/login')
    }
    if(userInfo.isAdmin || (JSON.stringify(userInfo.user)===JSON.stringify(order.user))){
    const addPayPalScript = async()=>{
      const {data:clientId} = await axios.get(`/api/config/paypal`)
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src= `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = ()=>{
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    if(!order || successPay || successDeliver){
      dispatch({type:ORDER_PAY_RESET})
      dispatch({type:ORDER_DELIVER_RESET})
    dispatch(getOrderDetails(orderId))}
    else if(!order.isPaid){
      if(!window.paypal){
        addPayPalScript()
      }else{
        setSdkReady(true)
      }
    }}else{
      history.push('/')
    }
  },[dispatch,orderId,successPay,order,successDeliver,userInfo,order,history])
  const onSuccessPaymentHandler = (paymentResult)=>{
    console.log(paymentResult)
    dispatch(payOrder(orderId,paymentResult))
  }
  const deliverHandler = ()=>{
    dispatch(orderDeliver(order))
  }
  return loading?<Loader></Loader> : error?<Message variant='danger'>{error}</Message>:(<>
  <h1>Order: {orderId}</h1>
  <Row>
    <Col md={8}>
      <ListGroup variant='flush'><ListGroup.Item>
        <h2>Shipping</h2>
        <p><strong>Name : </strong>{order.user.name}</p>
        <p> <strong>Email : </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
        <p>
          <strong>Address : </strong>
          {order.shippingAddress.address} ,{order.shippingAddress
          .city} - {order.shippingAddress.postalCode} {order.shippingAddress.country}
        </p>
        {order.isDelivered?<Message variant='success'>Delivered at  {order.deliveredAt.substring(0,10)}</Message> : <Message variant='danger'> Not Delivered</Message>}
          </ListGroup.Item>
          <ListGroup.Item>
            
            <h2>Payment Method</h2>
            <strong>Method : </strong>
             {order.paymentMethod&&order.paymentMethod} 
             
            {order.isPaid?<Message variant='success'>Paid at  {order.paidAt.substring(0,10)}</Message> : <Message variant='danger'> Not Paid</Message>}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order Items</h2>
            {order.orderItems.length===0?<Message>Your order is Empty</Message> : <ListGroup variant='flush'>
              {order.orderItems.map((item,index)=>(
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded></Image>
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                    {order.qty}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              </ListGroup>}
          </ListGroup.Item>
      </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>
                    Order Summary
                  </h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items </Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping </Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax </Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total Price </Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                
                  {
                    !order.isPaid && (
                      <ListGroup.Item>
                        {loadingPay && <Loader/>}
                        {!sdkReady?<Loader/> : 
                  <PayPalButton amount={order.totalPrice} onSuccess={onSuccessPaymentHandler}/>
                        }
                      </ListGroup.Item>
                    )
                  }
                {userInfo&&userInfo.isAdmin && order.isPaid && !order.isDelivered &&  (
                  <ListGroup.Item>
                    {loadingDeliver&&<Loader/>}
                    <Button type='button' className='btn btn-block' onClick={deliverHandler}>Mark As Deliver</Button>
                  </ListGroup.Item>
                )}
          </ListGroup>
        </Card>
    </Col>
  </Row>
  </>
  )
}

export default OrderScreen
