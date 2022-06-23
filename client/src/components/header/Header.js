import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Cart from'./icon/cart.svg'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {Dropdown} from'react-bootstrap'
import { useMyContext } from '../context/store'
const Header = () => {
  const auth = useSelector(state=>state.auth)
  const {user,isLogged,isAdmin} = auth
  const {count} = useMyContext()
  const handleLogout = async()=>{
    try {
      await axios.post('/user/logout',null)
      localStorage.removeItem('firstLogin')
      window.location.href=('/')
    } catch (error) {
      window.location.href=('/')
    }
  }
  const adminRouter = () =>{
    return(
        <>
            <li><Link to="/create_product">Create Product</Link></li>
            <li><Link to="/category">Categories</Link></li>
        </>
    )
}

const loggedRouter = () =>{
    return(
        <>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
        </>
    )
}
  return (
    <header>
          <div className="menu">
              <img src="" alt="Menu" width="30" />
          </div>

          <div className="logo">
              <h1>
              <Link to="/">{isAdmin ? 'Admin' : 'ThanhTung Shop'}</Link>
              </h1>
          </div>

          <ul>
              <li>
                <Link to="/">{isAdmin?"Products":"Shop"}</Link>
              </li>
              {isAdmin && adminRouter()}

              {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login ✥ Register</Link></li>
              }

                
              
        </ul>
      <div className="cart-icon">
              <span>{count}</span>
              <Link to="/cart">
                  <img src={Cart} alt="Cart" width="25"/>
              </Link>
          </div>
      {isLogged && <div className="cart-icon">
              <Link to="/">
                  <img src={user?.data&&user.data[0].avatar} alt="Cart" width="30" style={{borderRadius:"15px"}}/>
              </Link>
              <Dropdown style={{display:"inline-block"}}>
                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                <Dropdown.Menu style={{backgroundColor:"white"}}>
                  <div style={{cursor:"pointer",lineHeight:"5px"}}>
                    <p style={{textAlign:"left",marginLeft:"16px"}}>Signed in as</p>
                    <p style={{textAlign:"left",marginLeft:"16px", fontWeight:"700"}}>{user?.data&&user.data[0].name}</p>
                  </div>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          </div>
        }
        
        
</header>
  )
}

export default Header