import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import { LOGGED_IN_USER } from "../../actions/types";
import { createOrUpdateVendor} from "../../actions/auth";

const VendorRegisterComplete = ({history}) => {

  const emailVal= window.localStorage.getItem('emailForRegistration');

  const [email, setEmail] = useState(emailVal);
  const [password, setPassword] = useState("");
  const [loading,setLoading]= useState(false);
  const dispatch= useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration')); 
  }, [history]); 

  
  const handleSubmit= async (e) => {
    e.preventDefault();
    console.log("In handle SUBMIT", email,window.location.href);
    if( !email || !password) {
        toast.error("Email and password must be entered");
        return;
    }
    if( password.length < 6) {
        toast.error("Password must be minimum 6 characters");
        return;
    }
    try {      
        const email= window.localStorage.getItem('emailForRegistration');
        console.log("Before the result", email,window.location.href);
        if (!email) 
          email = window.prompt('Please provide your email for confirmation');
        const result = await auth.signInWithEmailLink(email, window.location.href)
        console.log("RESULT", result)
        if(result.user.emailVerified) {
            window.localStorage.removeItem("emailForRegistration");
            let user = auth.currentUser;
            await user.updatePassword(password);
            const idTokenResult = await user.getIdTokenResult();
            console.log("user", user, "idTokenResult", idTokenResult);
            // update in redux store 
          createOrUpdateVendor(idTokenResult.token)     
          .then ( (res) => dispatch ({
                 type: LOGGED_IN_USER,
                 payload: {
                 name: res.data.name,
                 email: res.data.email,
                 token: idTokenResult.token,
                 role: res.data.role,
                _id: res.data._id
              }             
          })         
          ) 
          .catch ( (err) => console.log(err)); 
           history.push('/');
        }
    } 
    catch (err) {
       console.log(err);
       toast.error(err.message);
    }
    }

 const completeRegisterForm = ()  => (
  <form  onSubmit= {handleSubmit} >
    {console.log("IN complete registration EMAIL", email)}
    <div className="form-group font-weight-bold">
     <label>Email</label> 
    <input type="email" 
           className="form-control" 
           value= {email}
           disabled
    />
    </div>
    <div className="form-group">
    <label >Password</label> 
    <input type="password" 
           className="form-control" 
           placeholder= "Password"
           value={password}
           onChange= {(e) => setPassword(e.target.value)} 
           autoFocus
    />
    </div>
     <button type="submit" 
             className= "btn btn-primary" >Complete Registration
     </button>
  </form>
  ) 

 return (
   <div className="container mt-5 ">  
      {console.log("In vendor register completion")}
     <div className="row">
       <div className="col-md-8 offset-md-3">
              <h1>Complete Vendor Registration</h1> 
                     
               {completeRegisterForm()}
           </div>
         </div>
       </div>    
 );
 }

export default VendorRegisterComplete;
