import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer,productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer, productTopRatedReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducers'
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers'
import {  orderListMyReducer, orderCreateReducer, orderDetailsReducer, orderPayReducer, orderGetReducer, orderDeliverReducer } from './reducers/orderReducers'
const reducer = combineReducers({
  productList:productListReducer,
  productDetails:productDetailsReducer,
  cart:cartReducer,
  userList : userListReducer,
  userLogin:userLoginReducer,
  userRegister:userRegisterReducer,
  userDetails :userDetailsReducer,
  userUpdateProfile : userUpdateProfileReducer,
  orderCreate : orderCreateReducer,
  orderDetails : orderDetailsReducer,
  orderPay : orderPayReducer,
  listMyOrder : orderListMyReducer,
  userDelete : userDeleteReducer,
  userUpdate: userUpdateReducer,
  productDelete : productDeleteReducer,
  createProduct : productCreateReducer,
  updateProduct : productUpdateReducer,
  orderList : orderGetReducer,
  orderDeliver : orderDeliverReducer,
  productReviewCreate : productReviewCreateReducer,
  productTopRated : productTopRatedReducer
})
const cartItemsFromStorage = localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const userInfoFromStorage = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{}

const initialState = {
  cart : {cartItems : cartItemsFromStorage,shippingAddress:shippingAddressFromStorage},
  userLogin : { userInfo : userInfoFromStorage}
}
const middleware = [thunk]
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store