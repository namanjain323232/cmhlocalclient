import React from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import keys from "../../config/keys";
import "../../stripe.css";
import StripeCheckout from "../stripe/StripeCheckout";

const promise= loadStripe(keys.REACT_APP_STRIPE_KEY)

const Payment= () => {

    return (

        <div className= "container p-5">
          <h4>Complete your payment</h4>
          {console.log("IN stripe payment")}
          <div className= "col col-md-8 offset-md-2">
            <StripeCheckout />
         </div>
                  
        </div>
    )
}

export default Payment;