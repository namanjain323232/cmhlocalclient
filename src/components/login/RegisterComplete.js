import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../../firebase";
import {toast, ToastContainer} from "react-toastify";
import { LOGGED_IN_USER } from "../../actions/types";
import { createOrUpdateUser} from "../../actions/auth";

const RegisterComplete = ({history}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch= useDispatch();
  const {user} = useSelector( (state) => ({...state}));

  //history.push(dashboard);

  useEffect(() => {
      setEmail(window.localStorage.getItem("emailForRegistration"))
  }, [history]);

  const handleSubmit= async (e) => {
    e.preventDefault();

    if( !email || !password) {
        toast.error("Email and password must be entered");
        return;
    }
    if( password.length < 6) {
        toast.error("Password must be minimum 6 characters");
        return;
    }
    try {
        const result = await auth.signInWithEmailLink(email, window.location.href)
        
        if(result.user.emailVerified) {
            window.localStorage.removeItem("emailForRegistration");
            let user = auth.currentUser;
            await user.updatePassword(password);
            const idTokenResult = await user.getIdTokenResult();
            // update in redux store 
           createOrUpdateUser(idTokenResult.token)     
          .then ( (res) => dispatch ({
                 type: LOGGED_IN_USER,
                 payload: {
                 name: res.data.name,
                 email: res.data.email,
                 token: idTokenResult.token,
                 role: res.data.role,
                _id: res.data._id
              }
          })) 
          .catch ( (err) => console.log(err)); 

          history.push('/');
        }
    } 
    catch (err) {
       console.log(err);
       toast.error(err.message);
    }
    }

    //save the user to local storage
    // window.localStorage.setItem('emailForRegistration', email);
    // setEmail("");


 const completeRegisterForm = ()  => {
  
  return (
  <form  onSubmit = {handleSubmit}>
    <div className="form-group font-weight-bold">
    <label htmlFor="email">Email</label>
    <input type="email" 
           className="form-control" 
           value= {email}
           disabled
    />
    </div>
    <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" 
           className="form-control" 
           placeholder= "Password"
           value={password}
           onChange= { (e) => setPassword(e.target.value)} 
           />
    </div>
   <button type="submit" className= "btn btn-primary float-center" > Register</button>
  </form>
  )
  }


 return (
   <div className="container mt-5 ">

     <div className="row">
       <div className="col-md-8 offset-md-3">
         <div className="card register-form">
           <div className="card-header">
              <h1>Complete Registration</h1>
           </div>
           <div className="card-body">
              {completeRegisterForm()}
           </div>
         </div>
       </div>
     </div>
     
   </div>
 );
 }

export default RegisterComplete;
