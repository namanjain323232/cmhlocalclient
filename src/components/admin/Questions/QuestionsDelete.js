import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import { fetchQuestion, deleteQuestion, fetchQuestions } from "../../../actions/questions";
import AdminMenu from "../AdminMenu";
import Modal from "../../Modal";
import history from "../../../history";
import { toast } from "react-toastify";

const QuestionsDelete = ({match}) => {

   const {user} = useSelector( state => ({...state}));
   const [questions, setQuestions] = useState([]);
   const [question, setQuestion] = useState("");
   const [loading, setLoading] = useState(false);

   useEffect( () => {
      getQuestions();
      getQuestion();      
   },[]);

   const getQuestions= () => {
        fetchQuestions().then ( (qs) => setQuestions(qs.data));
   }

   const getQuestion = () => {
      fetchQuestion(match.params.id)
      .then ( (q) => setQuestion(q.data))
      .catch( (err) => {
         console.log(err);
         setLoading(false);
         if(err.response===400) 
            toast.error(err.response.data);
          else
            toast.error(err.message);
      })
   } 

 const addRoute= () => {
        return("/admin/questions/questionscreate");
 }

 const handleDelete= () => {
    deleteQuestion(match.params.id, user.token)
   .then ( (res) => {
      setLoading(false);
      toast.success(`Question deleted successfully for ${match.params.id}`);
      getQuestions();
   })
   .catch( (err) => {
      console.log(err);
      setLoading(false);
      if(err.response===400) 
         toast.error(err.response.data);
       else
         toast.error(err.message);
   })
 }

const renderActions= () => {
    return (
       <React.Fragment>
       <button onClick= { handleDelete()} type="submit" className=" btn btn-danger primary-button mr-3">Yes</button>
       <Link to= "/admin/questions/questionsList" type="button" className= "btn btn-secondary primary-button">No</Link>
       </React.Fragment>
       );
  }


const renderContent= () => {
    if(! question) {
       return ("Are you sure you want to delete this question?");
    }
       return(`Are you sure you want to delete the question: ${question.question}`);
 }  

  return (
    <div>
    <AdminMenu 
       addRoute = {addRoute()} 
    />  
     { loading ?  <h2>"Loading....." </h2>  
     :
    <Modal 
      title= "Delete a Question"     
      content= {renderContent()}
      actions= {renderActions()}
      onDismiss = {() => history.push("/admin/categories/categorieslist") }
    />
     }
    </div>
   )     
}


export default QuestionsDelete;