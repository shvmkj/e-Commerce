import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader' 
import FormContainer from '../components/FormContainer'
import { getUserDetails,updateUser } from '../actions/userAction'
import { USER_ADMIN_UPDATE_RESET } from '../constants/userConstants'
const UserEditScreen = ({match,history}) => {
  const userId = match.params.id
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [isAdmin,setIsAdmin] = useState(false)
  const dispatch = useDispatch()
  const userDetails = useSelector(state=>state.userDetails)
  const {loading,error,user} = userDetails
  const userUpdate = useSelector(state=>state.userUpdate)
  const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = userUpdate
  useEffect(()=>{
    if(successUpdate){
      dispatch({type:USER_ADMIN_UPDATE_RESET})
      history.push('/admin/userlist')
    }else{
      if(!user.name || user._id!==userId){
      dispatch(getUserDetails(`/admin/${userId}`))}else{
        setEmail(user.email)
        setName(user.name)
        setIsAdmin(user.isAdmin)
      }
    }
  },[dispatch,user,history,userId,successUpdate])
  const submitHandler = (e)=>{
    e.preventDefault()
    dispatch(updateUser({_id:userId,name,email,isAdmin}))
  }
  return (
    <>
    <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
    <FormContainer>
      <h1>EDIT USER : {userId}</h1>
      {loadingUpdate&&<Loader></Loader>}
      {errorUpdate&&<Message variant='danger'>{errorUpdate}</Message>}
      {loading ? <Loader></Loader> : error?<Message variant='danger'>{error}</Message> : 
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>
            Enter User's Name
          </Form.Label>
          <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>
            User's Email Address
          </Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='isAdmin'>
          <Form.Check type='checkbox' label= 'Is Admin' checked={isAdmin} onChange={(e)=>{setIsAdmin(e.target.checked)
          console.log(e.target.checked)
          }}></Form.Check>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Update
        </Button>
      </Form>
      }
      </FormContainer>
    </>
  )
}

export default UserEditScreen
