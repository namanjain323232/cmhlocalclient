import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {auth, googleAuthProvider, facebookAuthProvider} from "../../firebase";
import {toast,ToastContainer} from "react-toastify";
import {Button } from 'antd';
import { MailOutlined, FacebookOutlined, GoogleOutlined} from '@ant-design/icons';
import { LOGGED_IN_USER } from "../../actions/types";
import { createOrUpdateUser} from "../../actions/auth";

  
const Login = ({history}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch= useDispatch();
  const {user} = useSelector( (state) => ({...state}));

      
  useEffect( () => {
     if (history.location.state) {
       return;
     } else {
      if ( user && user.token) {
          history.push("/");
      }}
  }, [user,history]);

  const roleBasedRedirect = (res) => {
    
    //check if user needs to be redirected to a different page
    let userPage= history.location.state;
    if (userPage) {
      history.push(userPage.from);
    }  else { 
     //role based redirect 
     if (res.data.role ===  "admin") {
       history.push("/admin/dashboard");
     } 
     else if (res.data.role === "vendor") {
       history.push("/vendor/dashboard");
     } else {
       history.push("/user/history");
     }
    }
  }
 
const handleSubmit= async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result= await auth.signInWithEmailAndPassword(email,password);
     
      const {user} = result;
      const idTokenResult = await user.getIdTokenResult();
     
      createOrUpdateUser(idTokenResult.token)     
          .then ( (res) =>  { dispatch  ({
                 type: LOGGED_IN_USER,
                 payload: {
                 name: res.data.name,
                 email: res.data.email,
                 token: idTokenResult.token,
                 role: res.data.role,
                _id: res.data._id,
                address: res.data.address,
                createdAt: res.data.createdAt,
                stripe_account_id:res.data.stripe_account_id,
                stripe_seller: res.data.stripe_seller,
                stripeSession: res.data.stripeSession,
              }
          });
          var userval= {name:res.data.name, 
                        email: res.data.email,
                        token: idTokenResult.token,
                         _id:res.data._id,
                         role:res.data.role,
                         address:res.data.address,
                         createdAt: res.data.createdAt,
                         stripe_account_id:res.data.stripe_account_id,
                         stripe_seller: res.data.stripe_seller,
                         stripeSession: res.data.stripeSession, }
          window.localStorage.setItem("user",JSON.stringify(userval));
          roleBasedRedirect(res);
         }) 
          .catch ( (err) => console.log(err))           
          // history.push("/");
          }  
    catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
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
          role: res.data.role,
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
       role:res.data.role,
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
          role: res.data.role,
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
       role:res.data.role,
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


 const loginForm = ()  => {
  
  return (
  <form  onSubmit = {handleSubmit}>
    <div className="form-group font-weight-bold mb-1 question">
    <label htmlFor="email">Email</label>
    <input type="email" 
           className="form-control" 
           value= {email}
           onChange = { (e) => setEmail(e.target.value) }
           autoFocus
    />
    </div>
    <div className="form-group font-weight-bold mb-2 question">
    <label htmlFor="password">Password</label>
    <input type="password" 
           className="form-control" 
           value= {password}
           onChange = { (e) => setPassword(e.target.value) }         
    />
    </div>
   <div className= "row justify-content-center font-weight-bold mt-2 question">
     <Button onClick= {handleSubmit} 
             type="primary" 
             shape="round"
             block
             icon= {<MailOutlined />}
             size= "large"
             disabled= {!email || password.length < 6}
             className= "mb-2 mt-2 font-weight-bold font-weight-bold question">Login with Email and Password
      </Button>
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
      <Link to= "/forgot/password" className= "text-danger mt-2">Forgot Password</Link>
   </div>
  
  </form>
  )
 }
 return (
   <div className="container mt-5 ">

     <div className="row">
       <div className="col-md-8 offset-md-3">
         <div className="card register-form">
           <div className="card-header">
              {loading ? (<h4>Loading....</h4>) : (<h4>Login</h4>) }              
           </div>
           <div className="card-body">           
             {loginForm()}
           </div>
         </div>
       </div>
     </div>
     
   </div>
 );
}

export default Login;
