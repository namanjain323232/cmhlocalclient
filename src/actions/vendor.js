import axios from "axios";
import history from "../history";

const ROOT_URL = "http://localhost:5000";

export const addVendor = async (formvalues, authtoken) => {
  const res = await axios.post(`${ROOT_URL}/api/vendor`, formvalues, {
    headers: { authtoken },
  });
  history.push(`/vendor/vendorcatlist`);
};

export const getAllVendorCategories = async (page) => {
  return await axios.get(`${ROOT_URL}/api/vendors`);
};

export const getVendorsByCount = async (count) => {
  return await axios.get(`${ROOT_URL}/api/vendors/count/${count}`);
};

export const getVendorCategoriesUser = async (userid, page) => {
  console.log(`user from actions`, userid);
  return await axios.get(`${ROOT_URL}/api/vendors/user/${userid}`, { page });
};

export const getVendorCategory = async (id) => {
  const cat = await axios.get(`${ROOT_URL}/api/vendor/${id}`);
  console.log(`Category from getvendorcategory`, cat);
  return cat;
};

export const deleteVendor = async (id, authtoken) => {
  console.log(`auth and id`, id, authtoken);
  const res = await axios.delete(`${ROOT_URL}/api/vendor/${id}`, {
    headers: { authtoken },
  });
  history.push(`/vendor/vendorcatlist`);
};

export const updateVendor = async (id, formvalues, authtoken) => {
  const res = await axios.put(`${ROOT_URL}/api/vendor/${id}`, formvalues, {
    headers: { authtoken },
  });
  history.push(`/vendor/vendorcatlist`);
};

export const getVendors = async (order, page) => {
  return await axios.post(`${ROOT_URL}/api/vendors`, { order, page });
};

export const getVendorsTotal = async () => {
  return await axios.get(`${ROOT_URL}/api/vendors/total`);
};

export const vendorRating = async (id, star, authtoken) => {
  const res = await axios.post(
    `${ROOT_URL}/api/vendor/rating/${id}`,
    { star },
    { headers: { authtoken } }
  );
};

export const vendorReview = async (id, review, authtoken) => {
  const res = await axios.post(
    `${ROOT_URL}/api/vendor/rating/${id}`,
    { review },
    { headers: { authtoken } }
  );
};

export const getRelatedVendors = async (id, location) => {
  const vendor = await axios.get(
    `${ROOT_URL}/api/vendors/related/${id}/${location}`
  );
  console.log(`vendors from getRelatedVendors`, vendor);
  return vendor;
};

export const getVendorsByFilter = async (arg) => {
  return await axios.post(`${ROOT_URL}/api/search/filters`, arg);
};

export const getVendorCatSlug = async (slug, page) => {
  console.log(`slug from actions`, slug);
  return await axios.get(`${ROOT_URL}/api/vendors/admincat/${slug}`, { page });
};

export const updateVendorAdmin = async (id, formvalues, authtoken) => {
  const res = await axios.put(`${ROOT_URL}/api/vendor/admincat/${id}`, formvalues, {
    headers: { authtoken },
  });
  history.push(`/admin/admincatlist`);
};

export const changeVendorStatus = async (id, formvalues, authtoken) => {
  const res = await axios.put(`${ROOT_URL}/api/vendor/admincat/${id}`, formvalues, {
    headers: { authtoken },
  });
  history.push(`/admin/dashboard`);
};
