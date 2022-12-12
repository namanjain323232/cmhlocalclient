import axios from "axios";
const ROOT_URL = 'http://localhost:5000';
export const createConnectAccount = async (authtoken) => {
  return await axios.post(`${ROOT_URL}/api/create-connect-account`, {},
    { headers: { authtoken } });
}

export const getAccountStatus = async (authtoken) => {

  console.log("AUTHTOKEN FROM GETACCOUNT STATUS", authtoken);
  const res = await axios.post(`${ROOT_URL}/api/get-account-status`, {},
    { headers: { authtoken } });
  console.log("RES from get account status", res);
  return res;
}

export const getAccountBalance = async (authtoken) => {
  const res = await axios.post(`${ROOT_URL}/api/get-account-balance`, {},
    { headers: { authtoken } });
  return res;
}

export const currencyFormatter = data => {
  return (data.amount / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency
  });
}

export const payoutSettings = async (authtoken) => {
  const res = await axios.post(`${ROOT_URL}/api/payout-settings`, {},
    { headers: { authtoken } });
  return res;
}


export const createPaymentIntent = async (authtoken) => {
  const res = await axios.post(`${ROOT_URL}/api/create-payment-intent`, {},
    { headers: { authtoken } });
  return res;
}

export const getSessionId = async (authtoken, vendorId) => {
  const res = await axios.post(`${ROOT_URL}/api/stripe-session-id`, { vendorId },
    { headers: { authtoken } });
  console.log("RES from STRIPE SESSION", res);
  return res;
}

export const stripeSuccessRequest = async (authtoken, vendor) => {
  console.log("FROM stripe success action", vendor);
  const res = await axios.post(`${ROOT_URL}/api/stripesuccess`, { vendor },
    { headers: { authtoken } });
  console.log("RES FROM STRIPE SESSION SUCCESS", res);
  return res;
}


