import React,{useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Button, Row,Col, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Paginate from '../components/Paginate'
import Message from '../components/Message'
import Loader from '../components/Loader' 
import { listProducts,deleteProduct,createProduct } from '../actions/productAction'
import {PRODUCT_CREATE_RESET} from '../constants/productConstant'
const ProductListScreen = ({history,match}) => {
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()
  const productList = useSelector(state=>state.productList)
  const {products,loading,error,page,pages} = productList
  const usersLogin = useSelector(state=>state.userLogin)
  const {userInfo} = usersLogin
  const productDelete = useSelector(state=>state.productDelete)
  const {success:successDelete,loading:loadingDelete,error:errorDelete} = productDelete
  const productCreate = useSelector(state=>state.createProduct)
  const {success:successCreate,loading:loadingCreate,error:errorCreate,product:createdProduct} = productCreate
  useEffect(()=>{
    dispatch({type:PRODUCT_CREATE_RESET})
    if(!userInfo.isAdmin){
      history.push('/login')
    }
    if(successCreate){
      history.push(`/admin/product/${createdProduct._id}/edit`)
    }else{
      dispatch(listProducts('',pageNumber))
    }
    },[dispatch,history,userInfo,successDelete,successCreate,createdProduct,pageNumber])
    const deleteHandler = (id)=>{
      console.log(id)
      if(window.confirm('Are You Sure?')){
          dispatch(deleteProduct(id))
      }
    }
    const createProductHandler = ()=>{
      dispatch(createProduct())
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
      {loadingDelete && <Loader/>}
      {loadingCreate &&<Loader/>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading?<Loader/>:error?<Message variant='danger'>{error}</Message> : (
        <>
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
      <Paginate pages={pages} page={page} isAdmin='true'/>
      </>
      )}
    </>
  )
}

export default ProductListScreen