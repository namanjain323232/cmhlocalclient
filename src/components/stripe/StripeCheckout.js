import React, {useState, useEffect} from "react";
import {CardElement, useStripe,useElements} from "@stripe/react-stripe-js";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {Card} from "antd";
import {PoundOutlined} from "@ant-design/icons";
import {createPaymentIntent, getSessionId} from "../../actions/stripe";
import {createOrder, emptyUserCart} from "../../actions/user";

const StripeCheckout= ({history}) => {

    const dispatch= useDispatch();
    const {user} = useSelector( state => ({...state}));

    const [succeeded,setSucceeded]= useState(false);
    const [error,setError]= useState(null);
    const [processing,setProcessing]= useState("");
    const [disabled,setDisabled]= useState(true);
    const [clientSecret,setClientSecret]= useState(false);

    const stripe= useStripe();
    const elements= useElements();

    const [cartTotal,setCartTotal]= useState(0);
   
    useEffect( () => {
       createPaymentIntent(user.token)
       .then ( res => {
           console.log("Response from payement intent",res.data);
           setClientSecret(res.data.clientSecret);
           setCartTotal(res.data.cartTotal);
       })
    },[]);

    const handleSubmit=  async (e) => {
         e.preventDefault()
         setProcessing(true);
        
         const res= await getSessionId(user.token,cartTotal);
         console.log("SESSION ID",res.data.sessionId);
         const payload= await stripe.confirmCardPayment(clientSecret, {
             payment_method: {
                 card: elements.getElement(CardElement),
                 billing_details: {
                   name:  e.target.name.value
                 }
             }
         })

         {console.log("PAYLOAD",payload)}

         if (payload.error) {
               setError(`Payment failed ${payload.error.message}`);
               setProcessing(false);                  
         } else {
             //create order and save to the database for admin to process
              createOrder(payload,user.token)
              .then ((res) => {
                if (res.data.ok) {
                  //empty cart from local storage
                   if ( typeof window !== "undefined") localStorage.removeItem("cart");
                   //empty cart from redux store
                   dispatch({
                     type: "ADD_TO_CART",
                     payload: []
                   });
                   emptyUserCart(user.token);
                }
              });
              
               console.log(JSON.stringify(payload));
               setError(null);
               setProcessing(false);
               setSucceeded(true);
         }
     }

    const handleChange= async (e) => {
        //listen to changes to card details and display errors as the customer enters card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");              
    }

    const cartStyle = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: "Arial, sans-serif",
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#32325d",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        },
      };

    return (
      <>
       
         <div className=" pb-5">

          <Card
              actions={[
                <>
                 <PoundOutlined className="text-info" /> <br /> Total Payable: £
                   {cartTotal}
                </>               
              ]}
          />
         </div>

        <form id="payment-form" className="stripe-form" onSubmit= {handleSubmit} >
          <CardElement id="card-element" 
                       options={cartStyle} 
                       onChange= {handleChange}    
          />
          <button className="stripe-button"
                  disabled= {processing || disabled || succeeded}
          >
           <span id="button-text">
               {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
           </span>
          </button>
          <br />
         { error && <div className="card-error" role="alert">{error}</div> }

        <p className= {succeeded ? "result-message" :  "result-message hidden"}>
           Payment Successful. <Link to= "/user/history">View your Purchase History</Link>
        </p>

        </form>

        
      </>

    )

}

export default StripeCheckout;