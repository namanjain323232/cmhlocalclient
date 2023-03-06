import axios from "axios";

const ROOT_URL = "http://localhost:5000";

export const userCart = async (cart, authtoken) => {
  const cartval = await axios.post(
    `${ROOT_URL}/user/cart`,
    { cart },
    { headers: { authtoken } }
  );
  console.log(`VALUE OF CART FROM ACTION USER CART`, cartval);
  return cartval;
};

export const contact = async (name, email, query) => {
  const contactVal = await axios.post(`${ROOT_URL}/user/contact`, {
    name,
    email,
    query,
  });
  console.log(contactVal);

  return contactVal;
};

export const cancelOrder = async (id) => {
  const cancelVal = await axios.put(`${ROOT_URL}/user/order/cancel/${id}`);
  console.log(cancelVal, "jnkdnaklsnalk");

  return cancelVal;
};

export const fetchQueries = async () => {
  const querieslist = await axios.get(`${ROOT_URL}/user/querieslist`);
  console.log(querieslist);

  return querieslist;
};

export const markAsRead = async (id) => {
  const querieslist = await axios.put(`${ROOT_URL}/user/markasread/${id}`);
  // console.log(querieslist);

  return querieslist;
};
export const markAsComplete = async (id) => {
  const orderlist = await axios.put(`${ROOT_URL}/user/markascomplete/${id}`);
  console.log(orderlist);

  return orderlist;
};

export const cancelOrderVendor = async (id, reason) => {
  const orderlist = await axios.put(
    `${ROOT_URL}/user/order/vendorcancel/${id}/${reason}`
  );
  console.log(orderlist);

  return orderlist;
};

export const getuserCart = async (authtoken) => {
  const cart = await axios.get(`${ROOT_URL}/user/cart`, {
    headers: { authtoken },
  });

  return cart;
};

export const emptyUserCart = async (authtoken) => {
  await axios.delete(`${ROOT_URL}/user/cart`, { headers: { authtoken } });
};

export const saveUserAddress = async (address, authtoken) => {
  return await axios.post(
    `${ROOT_URL}/user/address`,
    { address },
    { headers: { authtoken } }
  );
};

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
      token: userval.token,
    };
    console.log(`USERVAL NEW`, userval);
    localStorage.setItem(`user`, JSON.stringify(userval));
    next();
  }
};

export const createOrder = async (stripeResponse, authtoken) => {
  return await axios.post(
    `${ROOT_URL}/user/order`,
    { stripeResponse },
    { headers: { authtoken } }
  );
};

export const getUserOrders = async (authtoken) => {
  return await axios.get(`${ROOT_URL}/user/order`, { headers: { authtoken } });
};

