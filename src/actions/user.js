import axios from "axios";

export const userCart= async (cart,authtoken) => {
    const cartval= await axios.post("http://localhost:5000/user/cart", {cart},
      {headers: {authtoken}});    
     console.log("VALUE OF CART FROM ACTION USER CART",cartval);
    return cartval;
}

export const getuserCart= async (authtoken) => {
    const cart =await axios.get("http://localhost:5000/user/cart",
      {headers: {authtoken}}); 

    console.log("CART FROM GET",cart);
    return(cart);   
}

export const emptyUserCart= async (authtoken) => {
  await axios.delete("http://localhost:5000/user/cart", {headers: {authtoken}});
}

export const saveUserAddress= async (address,authtoken) => {
  return await axios.post("http://localhost:5000/user/address", {address},
    {headers: {authtoken}});    
}

// update user in local storage for stripe
 export const updateUserInLocalStorage= (user,next) => {
    if (window.localStorage.getItem("user")) {
      let userval= JSON.parse(localStorage.getItem("user"));
      const token= userval.token;
      userval = {_id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                picture: user.picture,
                address: user.address,
                cart: user.cart,
                stripe_account_id:user.stripe_account_id,
                stripe_seller: user.stripe_seller,
                stripeSession: user.stripeSession,
                token:userval.token
               } 
      console.log("USERVAL NEW",userval);
      localStorage.setItem("user",JSON.stringify(userval));
      next();
    }
 }

 export const createOrder= async (stripeResponse, authtoken) => {
    return await axios.post("http://localhost:5000/user/order", {stripeResponse},
     {headers: {authtoken}});
 }

 export const getUserOrders= async (authtoken) => {
   return await axios.get("http://localhost:5000/user/order",
    {headers: {authtoken}});
 }

