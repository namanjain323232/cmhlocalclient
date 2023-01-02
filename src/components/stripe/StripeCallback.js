import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons";
import {getAccountStatus} from "../../actions/stripe";
import { updateUserInLocalStorage } from "../../actions/user";

const StripeCallback= ({history}) => {

    console.log("IN stripe callback page....");
    
    const dispatch= useDispatch();    
    const {user} = useSelector((state) => ({...state}));
      
    console.log("USER",user);
    console.log("USER from stripe callback", user.token);
    // const {user} = useSelector((state) => ({...state}));
    // console.log("TOKEN for use from state", user.token);
        
    useEffect( () => {    
      if (user && user.token) loadAccountStatus()
     },[user]);
    

    const loadAccountStatus=  async () => {
       try { 
        debugger
        console.log("User token before call to fUNC",user.token);
        const res= await getAccountStatus(user.token);
        console.log("USER ACCOUNT STATUS STRIPE CALLBACK",res.data);
        const userval = {_id: res.data._id,
          email: res.data.email,
          name:res.data.name,
          role: res.data.role,
          picture: res.data.picture,
          address: res.data.address,
          cart: res.data.cart,
          stripe_account_id:res.data.stripe_account_id,
          stripe_seller: res.data.stripe_seller,
          stripeSession: res.data.stripeSession,
          token:user.token
         } 
        updateUserInLocalStorage( res.data, () => {
        dispatch({
            type:"LOGGED_IN_USER",
            payload: userval
          });
          window.location.href= "/vendor/dashboard";
        })
       }
      catch (err) {
         console.log(err);
      }
    }

    return (
        <div className="d-flex justify-content-center p-5">
           <h1> In callback page.... </h1>
           <LoadingOutlined 
               className= "display-1 p5 text-danger"
           />
        </div>
    )
}

export default StripeCallback;