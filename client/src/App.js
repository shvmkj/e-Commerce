import React from "react";
import {BrowserRouter as Router,Route } from 'react-router-dom'
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import CartScreen from "./screen/CartScreen";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import ProfileScreen from "./screen/ProfileScreen";
import ShippingScreen from "./screen/ShippingScreen"
import PaymentScreen from "./screen/PaymentScreen";
import PlaceOrderScreen from "./screen/PlaceOrderScreen";
import OrderScreen from "./screen/OrderScreen";
import UserListScreen from "./screen/UserListScreen";
import UserEditScreen from "./screen/UserEditScreen";
import ProductListScreen from "./screen/ProductListScreen";
import OrderListScreen from "./screen/OrderListScreen";
import ProductEditScreen from "./screen/EditProductScreen";
const App = ()=>{
  return (
<Router>
  <Header/>
  <main className='py-3'>
    <Container>
      <Route path='/' component={HomeScreen} exact ></Route>
      <Route path='/page/:pageNumber' component={HomeScreen} exact ></Route>
      <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact ></Route>
      <Route path='/search/:keyword' component={HomeScreen} exact></Route>
      <Route path='/product/:id' component={ProductScreen} />
      <Route path='/register' component={RegisterScreen} exact/>
      <Route path='/cart/:id?' exact component={CartScreen} />
      <Route path='/login' exact component={LoginScreen} />
      <Route path='/profile' exact component={ProfileScreen} />
      <Route path='/shipping' exact component={ShippingScreen} />
      <Route path='/payment' exact component={PaymentScreen} />
      <Route path='/placeorder' exact component={PlaceOrderScreen} />
      <Route path='/order/:id' exact component={OrderScreen} />
      <Route path='/admin/userlist' exact component={UserListScreen} />
      <Route path='/admin/user/:id/edit' exact component={UserEditScreen} />
      <Route path='/admin/productlist/' exact component={ProductListScreen}/>
      <Route path='/admin/productlist/page/:pageNumber' exact component={ProductListScreen}/>
      <Route path='/admin/orderlist/' exact component={OrderListScreen}/>
      <Route path='/admin/product/:id/edit' exact component={ProductEditScreen} />

    </Container>
  </main>
  <Footer/>
</Router>

  );
}

export default App;
