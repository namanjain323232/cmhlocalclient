import axios from "axios";
import history from "../history";

const ROOT_URL = 'http://localhost:5000';

//action creator for subcategory questions
export const addSubcatQuestion = async (values) =>  {
    const res= await axios.post(`${ROOT_URL}/api/subcatquestions`,values);    
     history.push("/admin/subcatquestions/subcatquestionslist");       
   };

 export const fetchSubcatQuestions = async () =>  {
   return await axios.get(`${ROOT_URL}/api/subcatquestions`);     
   }; 

 export const fetchSubcatQuestion = async (id) =>  {
   return await axios.get(`${ROOT_URL}/api/subcatquestions/${id}`); 
   }; 

 export const editSubcatQuestion = async (id,formValues) =>  {
   const res = await axios.patch(`${ROOT_URL}/api/subcatquestions/${id}`,formValues) ; 
   history.push("/admin/subcatquestions/subcatquestionslist");
  }; 

 export const deleteSubcatQuestion = async (id) =>  {
   const res = await axios.delete(`${ROOT_URL}/api/subcatquestions/${id}`);  
   history.push("/admin/subcatquestions/subcatquestionslist");
   };