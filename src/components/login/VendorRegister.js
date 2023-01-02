import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {auth,googleAuthProvider, facebookAuthProvider} from "../../firebase";
import {toast,ToastContainer} from "react-toastify";
import {Button} from "antd";
import {FacebookOutlined,GoogleOutlined} from "@ant-design/icons";
import { createOrUpdateUser} from "../../actions/auth";
import { LOGGED_IN_USER } from "../../actions/types";

const VendorRegister = ({history}) => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch= useDispatch();
  const {user} = useSelector( (state) => ({...state}));

  useEffect( () => {
      if ( user && user.token) {
          history.push("/");
      }
  }, [user,history]);

 
const handleSubmit= async (e) => {
    e.preventDefault();
    const config = {
       url: process.env.REACT_APP_VENDOR_REGISTER_REDIRECT_URL,
       handleCodeInApp: true
    }
    console.log("CONFIG",config);
    await auth.sendSignInLinkToEmail(email,config);
    toast.success(`Email is send to ${email}. Please check your email to complete registration.`);

    //save the user to local storage
    window.localStorage.setItem('emailForRegistration', email);
    setEmail("");
}

 const registerForm = ()  => {
  
  return (
  <form  onSubmit = {handleSubmit}>
    <div className="form-group font-weight-bold mb-1">
   
    <label htmlFor="email">Email</label>
    <input type="email" 
           className="form-control" 
           value= {email}
           onChange = { (e) => setEmail(e.target.value) }
           autoFocus
    />
    </div>
   <div className= "row justify-content-center">
     <button type="submit" className= "btn btn-primary mt-3" >Register</button>
   </div>
  
  </form>
  )
 }

 const googleLogin = async () => {
    
    await auth.signInWithPopup(googleAuthProvider).then( async (result) => {
      const {user} = result;
      console.log("user from google", result.user);
      const idTokenResult = await user.getIdTokenResult();
    
     createOrUpdateUser(idTokenResult.token)
     .then ( (res) => { dispatch ({
       type: LOGGED_IN_USER,
        payload: {
        name: res.data.name,
        email: res.data.email,
        token: idTokenResult.token,
        role: "vendor",
       _id: res.data._id,
       address: res.data.address,
       createdAt: res.data.createdAt,
       stripe_account_id:res.data.stripe_account_id,
       stripe_seller: res.data.stripe_seller,
       stripeSession: res.data.stripeSession,
      }
   })
   var userval= {
     name:res.data.name, 
     email: res.data.email,
     token: idTokenResult.token,
     _id:res.data._id,
     role:"vendor",
     address:res.data.address,
     createdAt: res.data.createdAt,
     stripe_account_id:res.data.stripe_account_id,
     stripe_seller: res.data.stripe_seller,
     stripeSession: res.data.stripeSession
     }
    window.localStorage.setItem("user",JSON.stringify(userval));
 
   roleBasedRedirect(res);
   
  }).catch( (err) => {
          console.log(err)
          toast.error(err.message)
          setLoading(false) });       
    })
   }

const facebookLogin = async () => {
  auth.signInWithPopup(facebookAuthProvider).then( async (result) => {
     const {user} = result;
     const idTokenResult = await user.getIdTokenResult();

     createOrUpdateUser(idTokenResult.token)
     .then ( (res) => { dispatch ({
       type: LOGGED_IN_USER,
        payload: {
        name: res.data.name,
        email: res.data.email,
        token: idTokenResult.token,
        role: "vendor",
       _id: res.data._id,
       address: res.data.address,
       createdAt: res.data.createdAt,
       stripe_account_id:res.data.stripe_account_id,
       stripe_seller: res.data.stripe_seller,
       stripeSession: res.data.stripeSession,
      }
   })
   let userval= {
      name:res.data.name, 
    email: res.data.email,
    token: idTokenResult.token,
     _id:res.data._id,
     role:"vendor",
     address:res.data.address,
     createdAt: res.data.createdAt,
     stripe_account_id:res.data.stripe_account_id,
     stripe_seller: res.data.stripe_seller,
     stripeSession: res.data.stripeSession
     }
     window.localStorage.setItem("user",JSON.stringify(userval));
     roleBasedRedirect(res);
  }).catch( (err) => {
    console.log(err)
    toast.error(err.message)
    setLoading(false) });   
 })
}

const roleBasedRedirect = (res) => {
    
    //check if user needs to be redirected to a different page
    let userPage= history.location.state;
    console.log("User PAGE",userPage);
    if (userPage) {
      history.push(userPage.from);
    }  else { 
     //role based redirect 
     if (res.data.role ===  "admin") {
       history.push("/admin/dashboard");
     } 
     else if (res.data.role === "vendor") {
       history.push("/vendor/dashboard");
     } else 
     {
       history.push("/user/history");
     }
    }
  }

 return (
   <div className="container mt-5 ">

     <div className="row mb-2">
       <div className="col-md-8 offset-md-3">
         <div className="card register-form">
           <div className="card-header">
              <h1>Register</h1>
           </div>
           <div className="card-body">
              {registerForm()}
           </div>

           <Button onClick= {googleLogin} 
             type="danger" 
             shape="round"
             block
             icon= {<GoogleOutlined />}
             size= "large"
             className= "mb-2 mt-2 font-weight-bold question">Login with Google
         </Button>
          <Button onClick= {facebookLogin} 
             type="primary" 
             shape="round"
             block
             icon= {<FacebookOutlined />}
             size= "large"
             className= "mb-2 mt-2 font-weight-bold question">Login with Facebook
         </Button>
         </div>
       </div>
     </div>
     
   </div>
 );
}

export default VendorRegister;
