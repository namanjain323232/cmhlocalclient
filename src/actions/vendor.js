import axios from "axios";
import history from "../history";

export const addVendor =  async (formvalues, authtoken) =>  {
    const res = await axios.post("http://localhost:5000/api/vendor",formvalues,
    {headers: {authtoken}}); 
    history.push("/vendor/vendorcatlist");
  };

export const getAllVendorCategories = async(page) => { 
  return await axios.get(`http://localhost:5000/api/vendors`); 
}

export const getVendorsByCount = async (count) => {
  return await axios.get(`http://localhost:5000/api/vendors/count/${count}`);
}

export const getVendorCategoriesUser = async(userid,page) => {
  console.log("user from actions",userid );
  return await axios.get(`http://localhost:5000/api/vendors/user/${userid}`,{page}); 
}

export const getVendorCategory = async(id) => {
  const cat= await axios.get(`http://localhost:5000/api/vendor/${id}`);
  console.log("Category from getvendorcategory",cat);
  return(cat); 
}

export const deleteVendor = async (id, authtoken) =>  {
  console.log("auth and id", id, authtoken);
  const res= await axios.delete(`http://localhost:5000/api/vendor/${id}`,
   { headers: {authtoken} }); 
   console.log("value of RES", res);
   history.push("/vendor/vendorcatlist");
  };

  export const updateVendor =  async (id,formvalues, authtoken) =>  {
    const res = await axios.put(`http://localhost:5000/api/vendor/${id}`,formvalues,
    {headers: {authtoken}}); 
    history.push("/vendor/vendorcatlist");
  };

  export const getVendors = async(order,page) => {
    return await axios.post(`http://localhost:5000/api/vendors`, {order, page}); 
  }

  export const getVendorsTotal= async () => {
    return await axios.get("http://localhost:5000/api/vendors/total"); 
  };

  export const vendorRating=  async (id, star,authtoken) =>  {
    const res = await axios.post(`http://localhost:5000/api/vendor/rating/${id}`,{star},
    {headers: {authtoken}});    
  };

  export const getRelatedVendors = async(id) => {
    const vendor= await axios.get(`http://localhost:5000/api/vendors/related/${id}`);
    console.log("vendors from getRelatedVendors",vendor);
    return(vendor); 
  }

  export const getVendorsByFilter = async (arg) => {
    return await axios.post(`http://localhost:5000/api/search/filters`,arg);
  }


