import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import {toast} from "react-toastify";
import {auth} from "../../firebase";

const ForgotPassword = ({history}) => {
  const [email,setEmail] = useState('');
  const [loading,setLoading] = useState(false);  
  const {user} = useSelector( (state) => ({...state}));

  useEffect( () => {
      if ( user && user.token) {
          history.push("/");
      }
  }, [user,history]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true) ;
    
    const config = {
         url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
         handleCodeInApp: true
      }
    await auth.sendPasswordResetEmail(email, config)
    .then( () => 
           { setEmail("");
             setLoading(false);
             toast.success("Check your email for password reset link");
            })
    .catch( (err) => {
      setLoading(false);
      toast.error(err.message);
      console.log("Error from forgot password",err);
    })   
  }

  return(
    <div className= "container col-md-4 offset-md-4 ">
     <div className="card register-form">
       <div className="card-header">
         {loading ? <h4>Loading</h4> : <h4>Forgot Password</h4>}
        </div>
        <div>
      <div className= "card-body">
      <form onSubmit= {handleSubmit}>
          <input
            type="email"
            className= "form-control mb-3"
            value= {email}
            onChange= { (e) => setEmail(e.target.value)}
            placeholder= "Enter your email"
            autoFocus
          />
          <div className= "row justify-content-center mb-2">
           <button className= "btn btn-primary" disabled= {!email}>Submit</button>
          </div>
      </form>
      </div>
      </div>
      </div>
         {/* history.push("/"); */}
    </div>

  )

    
}

export default ForgotPassword;