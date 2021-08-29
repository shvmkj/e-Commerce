import React from "react";
import {BrowserRouter as Router,Route } from 'react-router-dom'
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import CartScreen from "./screen/CartScreen";
import LoginScreen from "./screen/LoginScreen";

const App = ()=>{
  return (
<Router>
  <Header/>
  <main className='py-3'>
    <Container>
      <Route path='/' exact>
        <HomeScreen/>
      </Route>
      <Route path='/product/:id' component={ProductScreen} />
      <Route path='/cart/:id?' exact component={CartScreen} />
      <Route path='/login' exact component={LoginScreen} />
    </Container>
  </main>
  <Footer/>
</Router>

  );
}

export default App;
