import React,{useState,useEffect} from 'react'
import { Form, Button, Row ,Col,ListGroup,Image,Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'
const OrderScreen = ({match}) => {
  const orderId = match.params.id
  const orderDetails = useSelector(state=>state.orderDetails)
  const {loading,error,order} = orderDetails

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getOrderDetails(orderId))
  },[])
  return loading?<Loader></Loader> : error?<Message variant='danger'>{error}</Message>:(<>
  <h1>Order: {orderId}</h1>
  <Row>
    <Col md={8}>
      <ListGroup variant='flush'>
        <ListGroup.Item>
        <h2>Shipping</h2>
        <p><strong>Name : </strong>{order.user.name}</p>
        <p> <strong>Email : </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
        <p>
          <strong>Address : </strong>
          {order.shippingAddress.address} ,{order.shippingAddress
          .city} - {order.shippingAddress.postalCode} {order.shippingAddress.country}
        </p>
        {order.isDelivered?<Message variant='success'>Delivered at  {order.deliveredAt}</Message> : <Message variant='danger'> Not Delivered</Message>}
          </ListGroup.Item>
          <ListGroup.Item>
            <p>
            <h2>Payment Method</h2>
            <strong>Method : </strong>
             {order.paymentMethod&&order.paymentMethod} 
            </p>
            {order.isPaid?<Message variant='success'>Paid at  {order.paidAt}</Message> : <Message variant='danger'> Not Paid</Message>}
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
                <ListGroup.Item>
                  <Button type='button' className='btn-block' disabled={order.length===0} >Pay</Button>
                </ListGroup.Item>
          </ListGroup>
        </Card>
    
    </Col>
  </Row>
  </>
  )
}

export default OrderScreen
