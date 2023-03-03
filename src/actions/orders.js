import axios from "axios";
import history from "../history";
import {
//   CREATE_CATEGORY,
    FETCH_ORDERS,
//   FETCH_CATEGORY,
//   FETCH_CATEGORIES_NAME,
//   EDIT_CATEGORY,
//   DELETE_CATEGORY,
} from "../actions/types";

const ROOT_URL = "http://localhost:5000";
//action creators for Categories master

export const fetchOrders = async () => {
  return await axios.get(`${ROOT_URL}/api/orders`);
};

// export const fetchCategory = async (slug) => {
//   return await axios.get(`${ROOT_URL}/api/category/${slug}`);
//   // dispatch({type: FETCH_CATEGORY, payload:res.data });
// };

// //fetching the list of category names
// export const fetchCategoriesName = () => async (dispatch) => {
//   const res = await axios.get(`${ROOT_URL}/api/category`);
//   dispatch({ type: FETCH_CATEGORIES_NAME, payload: res.data });
// };

// export const addCategory = async (formvalues, authtoken) => {
//   const res = await axios.post(`${ROOT_URL}/api/category`, formvalues, {
//     headers: { authtoken },
//   });
//   // dispatch({type: CREATE_CATEGORY, payload: res.data });
//   history.push("/admin/categories/categorieslist");
// };

// export const editCategory = async (slug, formValues, authtoken) => {
//   const res = await axios.put(`${ROOT_URL}/api/category/${slug}`, formValues, {
//     headers: { authtoken },
//   });
//   console.log("Response from edit", res);
//   //   dispatch({type:EDIT_CATEGORY, payload: res.data });
//   history.push("/admin/categories/categorieslist");
// };

// export const deleteCategory = async (slug, authtoken) => {
//   const res = await axios.delete(`${ROOT_URL}/api/category/${slug}`, {
//     headers: { authtoken },
//   });
//   history.push("/admin/categories/categorieslist");
// };

// export const fetchCategorySubs = async (_id) => {
//   return await axios.get(`${ROOT_URL}/api/category/subcat/${_id}`);
// };
