import React,{useState,useEffect} from 'react'
import { Row,Col } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import Product from '../components/Product'
import Paginate from '../components/Paginate'
const HomeScreen = () => {
  const [ products,setProducts] = useState([])
  const [ pages,setPages] = useState([])
  const location = useLocation()
  const pageNumber = location.pathname.split('/')[2] || 1
  console.log(pageNumber)
  useEffect(()=>{
    fetch(`/api/products?pageNumber=${pageNumber}`,{
      method:'GET'
    }).then(res=>res.json())
    .then(prod=>{
      console.log(prod['pages'])
      setProducts(prod['products'])
      setPages(prod['pages'])
    })
  },[pageNumber])
  return (
    <>
      <h1>
        Latest Products
      </h1>
        <Row>
          {products.map((product)=>(
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              
                <Product product={product} />
              
            </Col>
          ))
          }
        </Row>
        <Paginate pages={pages} page={pageNumber}> </Paginate>
    </>
  )
}

export default HomeScreen