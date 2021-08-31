import React,{useState,useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Button, Tab,Row,Col, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader' 
import { listProducts,deleteProduct } from '../actions/productAction'
const ProductListScreen = ({history,match}) => {
  const dispatch = useDispatch()
  const productList = useSelector(state=>state.productList)
  const {products,loading,error} = productList
  const usersLogin = useSelector(state=>state.userLogin)
  const {userInfo} = usersLogin
  const productDelete = useSelector(state=>state.productDelete)
  const {success:successDelete,loading:loadingDelete,error:errorDelete} = productDelete

  useEffect(()=>{
    if(userInfo&&userInfo.isAdmin){
      dispatch(listProducts())}
      else{
        history.push('/login')
      }
    },[dispatch,history,userInfo,successDelete])
    const deleteHandler = (id)=>{
      console.log(id)
      if(window.confirm('Are You Sure?')){
          dispatch(deleteProduct(id))
      }
    }
    const createProductHandler = ()=>{
      console.log('product created')
    }
    return (
      <>
      
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Add Product</Button>
        </Col>
      </Row>
      <h1> Users</h1>
      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading?<Loader/>:error?<Message variant='danger'>{error}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>price</th>
            <th>category</th>
            <th>brand</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {products.map(product=>(<>
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant='light' className='btn-sm'>
                    <i className='fas fa-edit'></i>
                  </Button>
                </LinkContainer> 
                <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                  <i className='fas fa-trash'></i>
                </Button>
              </td>
            </tr>
          </>
          ))}  
        </tbody>
      </Table>
      )}
    </>
  )
}

export default ProductListScreen