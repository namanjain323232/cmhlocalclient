import axios from "axios";
import history from "../history";
const ROOT_URL = "http://localhost:5000";
//action creator for Questions Master
export const addQuestion = async (values, authtoken) => {
  console.log("In questions action creator", values);
  const res = await axios.post(`${ROOT_URL}/api/question`, values, {
    headers: { authtoken },
  });
  history.push("/admin/questions/questionslist");
};

export const fetchQuestions = async () => {
  return await axios.get(`${ROOT_URL}/api/questions`);
};

export const fetchQuestion = async (id) => {
  return await axios.get(`${ROOT_URL}/api/question/${id}`);
};

export const editQuestion = (id, formValues) => async (dispatch) => {
  const res = await axios.put(`${ROOT_URL}/api/questions/${id}`, formValues);
  //    dispatch({ type: EDIT_QUESTION, payload: res.data });
  history.push("/admin/questions/questionslist");
};

export const deleteQuestion = async (id, authtoken) => {
  const res = await axios.delete(`${ROOT_URL}/api/question/${id}`, {
    headers: { authtoken },
  });
  history.push("/admin/questions/questionslist");
};
