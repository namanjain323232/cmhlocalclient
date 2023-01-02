import React, {useState} from "react";
import {connect, useSelector} from "react-redux";
import { toast } from "react-toastify";
import AdminNav from "../../navigation/AdminNav";
import AdminMenu from "../AdminMenu";
import QuestionsForm from "./QuestionsForm";
import { addQuestion } from "../../../actions/questions";


const QuestionsCreate = () => {

  const {user} = useSelector( state => ({...state}));
  const [question,setQuestion]= useState("");
  const [options,setOptions]= useState([]);
  const [loading,setLoading]= useState(false);

const addRoute= () => {
    return("/admin/questions/questionscreate");
}

const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      addQuestion({question,options},user.token)
      .then( (res) =>         
      {
        setLoading(false);
        setQuestion("");
        setOptions("");
        toast.success("Question is created successfully!!!!");
      })
      .catch(err => {
           console.log(err);
           toast.error("Category creation failed !!!!!");
          }            
         )
       }

       
      return (             
        <div className= "row">
        <div className= "col col-md-2">
          <AdminNav />
        </div>
        <div className= "col col-md-10">
        <AdminMenu
          addRoute= {addRoute}
         /> 
         { (loading) ? <h2>Loading...</h2>
           : <h2 className="category-head font-weight-bold card-header">Add Questions </h2> 
         }         
          <QuestionsForm
             handleSubmit = {handleSubmit}
             question= {question}
             setQuestion= {setQuestion}
             options= {options}
             setOptions= {setOptions}
           /> 
          </div>       
        </div>
    )
  }


export default QuestionsCreate;
