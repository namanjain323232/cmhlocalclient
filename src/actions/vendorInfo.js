import axios from "axios";
import history from "../history";

const ROOT_URL = "http://localhost:5000";

export const addVendorInfo = async (formvalues, authtoken) => {
  const res = await axios.post(`${ROOT_URL}/api/vendorinfo`, formvalues, {
    headers: { authtoken },
  });
  history.push(`/vendor/dashboard`);
};

export const fetchVendorsInfo = async () => {
  return await axios.get(`${ROOT_URL}/api/vendorinfo`);
};

export const fetchVendorInfo = async (email) => {
  return await axios.get(`${ROOT_URL}/api/vendorinfo/${email}`);
};

export const editVendorInfo = async (email, formvalues, authtoken) => {
  const res = await axios.put(
    `${ROOT_URL}/api/vendorinfo/${email}`,
    formvalues,
    { headers: { authtoken } }
  );
  history.push(`/vendor/dashboard`);
};

export const deleteVendorInfo = async (email, authtoken) => {
  const res = await axios.delete(`${ROOT_URL}/api/vendorinfo/${email}`, {
    headers: { authtoken },
  });
  history.push(`/admin/vendors/vendorinfolist`);
};

export const fetchVendorInfoById = async (id) => {
  console.log(`Response from InfoId`, id);
  return await axios.get(`${ROOT_URL}/api/vendorinfo/${id}`);
};

export const fetchVendorInfoByVen = async (venid) => {
  console.log(`Response from InfoId`, venid);
  return await axios.get(`${ROOT_URL}/api/vendorinfo/vendor/${venid}`);
};

export const fetchRegVendors = async () => {
  console.log("IN VENDOR LIST EXPORT");
  const vendorlist = await axios.get(`${ROOT_URL}/api/regvendors`);
  console.log(vendorlist);
  return vendorlist;
};

export const fetchRegVendorSlug = async (slug) => {
  console.log("Vendor info by slug", slug);
  const vendor = await axios.get(`${ROOT_URL}/api/regvendor/${slug}`);
  return vendor;
};

export const editRegVendor = async (slug, formvalues, authtoken) => {
  const res = await axios.put(`${ROOT_URL}/api/regvendor/${slug}`, formvalues, {
    headers: { authtoken },
  });
  history.push(`/admin/dashboard`);
};

export const removeRegVendor = async (slug, formvalues, authtoken) => {
  const res = await axios.put(
    `${ROOT_URL}/api/regvendordel/${slug}`,
    formvalues,
    {
      headers: { authtoken },
    }
  );
  history.push(`/admin/dashboard`);
};
