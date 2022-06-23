import axios from 'axios'
import React,{useState} from 'react'
import {Link} from'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from '../../../validator/notification/notificaltion'
import { dispatchLogin } from '../../redux/actions/authAction'
import { useDispatch } from 'react-redux'
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const initState ={
    email:"",
    password:"",
    err:"",
    success:""
  }
  
  const [user,setUser] = useState(initState)
  const {email,password,err,success} = user
  const handleChange =(e)=>{
    const {name,value} = e.target;
    setUser({...user,[name]:value, err:"",success:""})
  }
  const handleSumit = async e=>{
    e.preventDefault()
    try {
      await axios.post('/user/login',{email,password}).then(res=>{
        setUser({...user,err:"",success:res.data.msg})
        localStorage.setItem("firstLogin",true)
        dispatch(dispatchLogin())
        navigate('/')
      })
    } catch (err) {
      setUser({...user,err:err.response.data.msg,success:""})
    }
  }
  return (
    <div>
        <button  className="back" style={{backgroundColor:"white"}} onClick={()=>navigate(-1)}>
                <i className="fas fa-long-arrow-alt-left"></i> Go Back
            </button>
        <div id="logreg-forms">
                <form onSubmit={handleSumit}>
                    <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: "center" }}> Sign in</h1>
                    <div className="social-login">
                        <button className="btn facebook-btn social-btn" type="button"><span><i className="fab fa-facebook-f"></i> Sign in with Facebook</span> </button>
                        <button className="btn google-btn social-btn" type="button"><span><i className="fab fa-google-plus-g"></i> Sign in with Google+</span> </button>
                    </div>
                    <p style={{ textAlign: "center" }}> OR  </p>
                    {err&&showErrMsg(err)}
                    {success&& showSuccessMsg(success)}

                    <input type="email" id="email" className="form-control" placeholder="Email address" value={email} name="email" onChange={handleChange}></input>
                    <input type="password" id="password" className="form-control" placeholder="Password" value={password} name="password"  onChange={handleChange}></input>
                    <button className="btn btn-success btn-block" type="submit"><i className="fas fa-sign-in-alt"></i> Sign in</button>
                    <Link to="/forgot_password" id="forgot_pswd">Forgot password?</Link>
                    <hr></hr>
                    <button  className="btn btn-primary btn-block" type="button" id="btn-signup" onClick={()=>navigate('/register')}><i className="fas fa-user-plus"></i> Sign up New Account</button>
                </form>
            </div>
    </div>
  )
}

export default Login