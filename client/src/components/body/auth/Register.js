import React from 'react'
import { Link } from 'react-router-dom'
const Register = () => {
  return (
<div className="container">
<div className="register">
<article className="card-body mx-auto" style={{maxWidth: "400px"}}>
	<h4 className="card-title mt-3 text-center">Create Account</h4>
	<p className="text-center">Get started with your free account</p>
	<p>
		<Link to="#" className="btn btn-block btn-twitter"> <i className="fab fa-twitter"></i> Login with Twitter</Link>
		<Link to="#" className="btn btn-block btn-facebook"> <i className="fab fa-facebook-f"></i>  Login with facebook</Link>
	</p>
	<p className="divider-text">
        <span className="bg-light">OR</span>
    </p>
	{/* {err&&showErrMsg(err)}
	{success&&showSuccessMsg(success)} */}
	<form onSubmit>
	<div className="form-group input-group">
		<div className="input-group-prepend">
		    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
		 </div>
        <input name="name" value="{name}" className="form-control" placeholder="Name" type="text"/>
    </div>
    <div className="form-group input-group">
    	<div className="input-group-prepend">
		    <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
		 </div>
        <input name="email" value="{email}" className="form-control" placeholder="Email address" type="email" />
    </div>
    {/* <div className="form-group input-group">
    	<div className="input-group-prepend">
		    <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
		</div>
		<select className="custom-select" style={{maxWidth: "120px"}}>
		    <option selected="">+971</option>
		    <option value="1">+972</option>
		    <option value="2">+198</option>
		    <option value="3">+701</option>
		</select>
    	<input name="" className="form-control" placeholder="Phone number" type="text"/>
    </div> */}
    {/* <div className="form-group input-group">
    	<div className="input-group-prepend">
		    <span className="input-group-text"> <i className="fa fa-building"></i> </span>
		</div>
		<select className="form-control">
			<option selected=""> Select job type</option>
			<option>Designer</option>
			<option>Manager</option>
			<option>Accaunting</option>
		</select>
	</div>  */}
    <div className="form-group input-group">
    	<div className="input-group-prepend">
		    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
		</div>
        <input className="form-control" placeholder="Create password"  name="password" value="{password}" type="password" />
    </div> 
    <div className="form-group input-group">
    	<div className="input-group-prepend">
		    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
		</div>
        <input className="form-control" placeholder="Repeat password" name="cf_password" value="{cf_password}" type="password"/>
    </div>                                     
    <div className="form-group">
        <button type="submit" className="btn btn-primary btn-block"> Create Account  </button>
    </div>     
    <p className="text-center">Have an account? <Link to="/login">Log In</Link> </p>                                                                 
</form>
</article>
</div>

</div> 
  )
}

export default Register