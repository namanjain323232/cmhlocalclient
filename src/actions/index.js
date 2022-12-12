import axios from "axios";
import { formValues } from "redux-form";
import history from "../history";
import addressDistance from "../apis/addressDistance";
import {
  FETCH_USER,
  FETCH_DISTANCE,
  SUBMIT_VENDOR,
  CREATE_VENDOR,
  FETCH_CATEGORIES_NAME,
  FETCH_SUBCATEGORIES_NAME,
  FETCH_SUBCATEGORIES_CATEGORIES,
  FETCH_QUESTIONS_NAME,
  CREATE_QUESTION,
  FETCH_QUESTIONS,
  FETCH_QUESTION,
  DELETE_QUESTION,
  EDIT_QUESTION,
  CREATE_SUBCAT_QUESTION,
  FETCH_SUBCAT_QUESTIONS,
  FETCH_SUBCAT_QUESTION,
  EDIT_SUBCAT_QUESTION,
  DELETE_SUBCAT_QUESTION
} from "./types";
const ROOT_URL = 'http://localhost:5000';

export const fetchDistance = () => async dispatch => {
  const res = await addressDistance.get("/json?origins");
  dispatch({ type: FETCH_DISTANCE, payload: res.data });
};

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};


//fetching the list of subcategory names
export const fetchSubcategoriesName = () => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/api/subcategory`);
  dispatch({ type: FETCH_SUBCATEGORIES_NAME, payload: res.data });
}


// fetching the list of questions
export const fetchQuestionsName = () => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/api/questions`);
  dispatch({ type: FETCH_QUESTIONS_NAME, payload: res.data });
}




//action creator for Vendors
export const submitVendor = (values, history) => async dispatch => {
  console.log("values from vendor action creator:", values);
  const res = await axios.post(`${ROOT_URL}/api/vendor`, values);
  //  history.push("/");
  //  window.location.href = '/'
  dispatch({ type: SUBMIT_VENDOR, payload: res.data });
};

export const submitVendorCategories = (values, history) => async dispatch => {
  const res = await axios.post(`${ROOT_URL}/api/vendorcategories`, values);
  //  history.push("/");
  window.location.href = '/'
};








