import axios from 'axios';
const ROOT_URL = 'http://localhost:5000';
export const createOrUpdateUser = async (authtoken) => {
    const res= await axios.post( `${ROOT_URL}/api/auth/createupdateuser`, {},
     {headers: {authtoken} });   
    console.log("RES from CREATEUPDATE ACTION",res) ;
    return res;
   }

   export const createOrUpdateVendor = async (authtoken) => {
    const res= await axios.post( `${ROOT_URL}/api/auth/createupdatevendor`, {},
     {headers: {authtoken} });   
    console.log("RES from CREATEUPDATE VENDOR",res) ;
    return res;
   }

export const currentUser = async (authtoken) => {
    return  await axios.post( `${ROOT_URL}/api/auth/currentuser`, {},
     {headers: {authtoken} });           
   }

export const adminUser = async (authtoken) => {
    return  await axios.post( `${ROOT_URL}/api/auth/adminuser`, {},
     {headers: {authtoken} });           
 }

 export const vendorUser = async (authtoken) => {
  return  await axios.post( `${ROOT_URL}/api/auth/vendoruser`, {},
   {headers: {authtoken} });           
}

export const updateUserInLocalStorage= (token,next) => {
  if(window.localStorage.getItem("user")) {
    let user= JSON.parse(localStorage.getItem("user"));
    user.token= token;
    localStorage.setItem("user",JSON.stringify(user));
    next();
  }
}

