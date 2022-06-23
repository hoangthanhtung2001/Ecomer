import React from 'react'
import { useSelector } from 'react-redux'
import {Route,Routes } from 'react-router-dom'
import { Emty } from '../../validator/validator'
import { useMyContext } from '../context/store'
import CardDetails from '../pages/CardDetails'
import Home from '../pages/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import ProductDetails from './Products/ProductDetails'
const Body = () => {
   const {count} = useMyContext()
   const auth = useSelector(state=>state.auth)
   const token = useSelector(state=>state.token)
   const {isLogged} = auth
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/products/:id' element={<ProductDetails/>}></Route>
            <Route path='/login' element={isLogged?Emty("404 NOT FOUND"):<Login/>}></Route>
            <Route path='/register' element={isLogged?Emty("404 NOT FOUND"):<Register/>}></Route>
            <Route path='/cart' element ={count>0?<CardDetails/>:Emty("Cart Emty")}></Route>
        </Routes>
    </div>
  )
}

export default Body