import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import { Row,Col,Image,ListGroup,Card,Button, ListGroupItem, Form } from 'react-bootstrap'
import Rating  from '../components/Rating'
import { useDispatch,useSelector } from 'react-redux'
import { listProductsDetails } from '../actions/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({history,match}) => {
  const[qty,setQty] = useState(0)
  const dispatch = useDispatch()
  const productDetails = useSelector(state=>state.productDetails)
  const{loading,product,error} = productDetails
    useEffect(()=>{
      dispatch(listProductsDetails(match.params.id))
    },[dispatch,match])
    const addToCartHandler = ()=>{
      history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
      {loading?<Loader/>:error?<Message/>:
      (
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product._id} fluid></Image>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  {product.name}
                </h2>
              </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={Number(product.rating)} text={`${product.numReviews} reviews`}></Rating>
                </ListGroup.Item>
                <ListGroup.Item>
                  Price : ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  {product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                  Price: 
                  </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                  Status: 
                  </Col>
                  <Col>
                    <strong>{product.countInStock>0?"In Stock":"Out In Stock"}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {
                  product.countInStock>0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty
                      </Col>
                      <Col>
                      <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                        {[...Array(product.countInStock).keys()].map((x) =>(
                          <option key={x+1} value={x+1}>
                            {x+1}
                          </option>
                        ))}
                      </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                    )
                }
                <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock===0 } >Add To Cart</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>)
      }
    </>
  )
}

export default ProductScreen
