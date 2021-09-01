import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import { Row,Col,Image,ListGroup,Card,Button, Form} from 'react-bootstrap'
import Rating  from '../components/Rating'
import { useDispatch,useSelector } from 'react-redux'
import { listProductsDetails,createProductReview } from '../actions/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstant'
const ProductScreen = ({history,match}) => {
  console.log(match)
  const[qty,setQty] = useState(1)
  const[rating,setRating] = useState(0)
  const[comment,setComment] = useState('')
  const dispatch = useDispatch()
  const productDetails = useSelector(state=>state.productDetails)
  const{loading,product,error} = productDetails
  const userLogin = useSelector(state=>state.userLogin)
  const{userInfo} = userLogin
  const productCreateReview = useSelector(state=>state.productReviewCreate)
  const{loading:loadingProductCreateReview,success:successProductReview,error:errorCreateReview} = productCreateReview
    useEffect(()=>{
      // eslint-disable-next-line
      if(errorCreateReview){
        dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
      }
      if(successProductReview){
        alert('Review Submitted')
        setRating(0)
        setComment('')
        dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
      }
        dispatch(listProductsDetails(match.params.id))
    },[dispatch,match,successProductReview])
    const addToCartHandler = ()=>{
      history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    const onSubmitHandler = (e)=>{
      e.preventDefault()
      dispatch(createProductReview(match.params.id,{rating,comment}))
    }
    console.log(rating, typeof(rating))
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
      {loading?<Loader/>:error?<Message/>:
      (
      <>
      <Row>
        <Col md={5}>
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
        <Col md={4}>
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
                    <strong>{product.countInStock>0?"In Stock":"Out Of Stock"}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {
                  product.countInStock>0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
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
      </Row> 
      <Row>
        <Col md={6}>
          <h2> Reviews </h2>
          {product.reviews.length===0 && <Message>No Reviews</Message>}
          <ListGroup variant='flush'>
                {product.reviews.map(review=>(
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} text={review.comment}/>
                    <p>{review.createdAt.substring(0,10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorCreateReview  && <Message variant='danger'>{errorCreateReview}</Message>}
                  {userInfo?(
                  <Form onSubmit={onSubmitHandler}>
                    <Form.Group controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control as='select' value={rating} onChange={e=>setRating(Number(e.target.value))}>
                      <option value=''>Select Rating</option>
                      <option value='1'>1-Poor</option>
                      <option value='2'>2-Fair</option>
                      <option value='3'>3-Good</option>
                      <option value='4'>4-Very Good </option>
                      <option value='5'>5-Excellent</option>
                    </Form.Control>
                    </Form.Group>
                    {loadingProductCreateReview&&<Loader/>}
                    <Form.Group controlId='comment'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control as='textarea' row='3' value={comment} onChange={e=>setComment(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'> Coment</Button>
                  </Form>
                  ) : <Message variant='danger'>Please <Link to='/login'>sign in</Link>to write review</Message>
                  }
                </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      </>)
      }
    </>
  )
}

export default ProductScreen
