import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {stripeSuccessRequest} from "../../actions/stripe";
import {createOrder, emptyUserCart} from "../../actions/user";
import {LoadingOutlined} from "@ant-design/icons";

const StripeSuccess = ({match,history}) => {

    const {user} = useSelector( (state) => ({...state}));
    const dispatch= useDispatch();
    {console.log("VENDOR FROM success page",match.params.vendor)}
    console.log("user TOKEN",user.token, match.params.vendor);
    useEffect( () => {
       stripeSuccessRequest(user.token,match.params.vendor)
       .then( (res) => {
            console.log(res);
            console.log(res.data);
            console.log(res.ok);
           if (res && res.data && res.data.ok) {
               console.log("RES",res.data); 
               //empty cart from local storage
               if ( typeof window !== "undefined") localStorage.removeItem("cart");
               //empty cart from redux store
               dispatch({
                 type: "ADD_TO_CART",
                 payload: []
               });
               emptyUserCart(user.token);
               console.log("RES from stripe success", res.data)
               history.push("/user/history");
           } else {
              history.push("/stripe/cancel");
           }
       })
    },[match.params.vendor]);

    return (

       <div className="container">
        <div className="col">
            <LoadingOutlined  className="display-1 text-danger p-5"/>
         </div>
       </div> 
    )
}

export default StripeSuccess;