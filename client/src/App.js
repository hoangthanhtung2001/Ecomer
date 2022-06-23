import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Body from './components/body/Body'
import Header from './components/header/Header'
import {BrowserRouter} from'react-router-dom'
import {  dispatchGetUser, dispatchLogin, fetchUser } from './components/redux/actions/authAction'
import { useMyContext } from './components/context/store'

const App = () => {
  const dispatch = useDispatch()
  const token = useSelector(state=>state.token)
  const auth = useSelector(state=>state.auth)
  const {setCount} = useMyContext()
  useEffect(()=>{
    const fistLogin = localStorage.getItem("firstLogin")
    if(fistLogin){
      const getToken = async()=>{
        const res = await axios.post('/user/refresh_token',null,{withCredentials:true})
        dispatch({type:"GET_TOKEN",payload:res.data.accessToken})
      }
      getToken()
    }

  },[auth.isLogged,dispatch])

  useEffect(()=>{
    if(token){
      const getUser = ()=>{
        dispatch(dispatchLogin())
        return fetchUser(token).then(res=>{
          dispatch(dispatchGetUser(res))
          setCount(res.data.count)
        })
      }
      getUser()
      

 }
  },[token,dispatch])

  

  return (
      <div className='App'>
          <Header/>
          <Body/>
      </div>
  )
}

export default App
