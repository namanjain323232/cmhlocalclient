import axios from "axios";


const ROOT_URL = 'http://localhost:5000';

export const userCart = async (cart, authtoken) => {
  const cartval = await axios.post(`${ROOT_URL}/user/cart`, { cart },
    { headers: { authtoken } });
  console.log(`VALUE OF CART FROM ACTION USER CART`, cartval);
  return cartval;
}

export const getuserCart = async (authtoken) => {
  const cart = await axios.get(`${ROOT_URL}/user/cart`,
    { headers: { authtoken } });

  console.log(`CART FROM GET`, cart);
  return (cart);
}

export const emptyUserCart = async (authtoken) => {
  await axios.delete(`${ROOT_URL}/user/cart`, { headers: { authtoken } });
}

export const saveUserAddress = async (address, authtoken) => {
  return await axios.post(`${ROOT_URL}/user/address`, { address },
    { headers: { authtoken } });
}

// update user in local storage for stripe
export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem(`user`)) {
    let userval = JSON.parse(localStorage.getItem(`user`));
    const token = userval.token;
    userval = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      picture: user.picture,
      address: user.address,
      cart: user.cart,
      stripe_account_id: user.stripe_account_id,
      stripe_seller: user.stripe_seller,
      stripeSession: user.stripeSession,
      token: userval.token
    }
    console.log(`USERVAL NEW`, userval);
    localStorage.setItem(`user`, JSON.stringify(userval));
    next();
  }
}

export const createOrder = async (stripeResponse, authtoken) => {
  return await axios.post(`${ROOT_URL}/user/order`, { stripeResponse },
    { headers: { authtoken } });
}

export const getUserOrders = async (authtoken) => {
  return await axios.get(`${ROOT_URL}/user/order`,
    { headers: { authtoken } });
}

