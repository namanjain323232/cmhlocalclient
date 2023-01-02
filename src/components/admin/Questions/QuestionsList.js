import React, {useState,useEffect, Fragment} from "react";
import AdminMenu from "../AdminMenu";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import {fetchQuestions} from "../../../actions/questions";
import AdminNav from "../../navigation/AdminNav";
import categoryReducer from "../../../reducers/categoryReducer";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";

const QuestionsList = () =>
{
  
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect( () => {
      getQuestions(); 
  }, []);

  const getQuestions= () => {
    setLoading(true);
    fetchQuestions()
    .then( (res) => setQuestions(res.data));  
    setLoading(false);    
  }

    const addRoute= () =>  {
        return("/admin/questions/questionscreate");
       }

    const renderList= () => {
        return (   
          questions && questions.map( questionVal => {        
          return (         
            <div className= "row mt-1" key= {questionVal._id}>                    
            <div className= "col col-md-6 question" >
             <p > {questionVal.question}</p>  
            </div>
            <div className= "col col-md-3 question" > 
              {questionVal.options && questionVal.options.map( optionVal => {
                 return(                              
                  <p key= {optionVal.option} >{optionVal}</p>             
                 )
             }) 
             }                 
             </div>    
             <div className= " col col-md-3 float-right ">
                      <Link to= {`/admin/questions/questionsedit/${questionVal._id}`}
                                   className= "btn btn-primary  mr-1">
                                   <EditOutlined />
                       </Link>
                      <Link to= { `/admin/questions/questionsdelete/${questionVal._id}`} 
                            className= "btn btn-danger mr-1">
                            <DeleteOutlined /></Link>    
             </div> 
                </div> 
          )          
                
        }) 
              
       ) 
    }
    
    
    return (
     <div> 
      
      <div className= "row">
       <div className= "col col-md-2">
         <AdminNav />
       </div>
       <div className= "col col-md-9">
       <AdminMenu
            addRoute = {addRoute()}
           />
        { (loading) ? <h2>Loading....</h2>      
                   :<h2 className= "font-weight-bold">List Questions </h2> 
      } 
       <div className= "container mt-2" > 
       <div className = "row p-3 bg-light ">
          <div className= "col col-md-6 ">
            <h5 className= "font-weight-bold text-left"> Question</h5>           
          </div>
           <div className= "col col-md-3">
            <h5 className= "font-weight-bold text-left"> Options</h5>             
            </div>
         </div>
        <div className= "card">        
          <form>
             {renderList()}
          </form>          
       </div> 
       </div>
       </div>
     </div> 
     </div>
    )}


export default QuestionsList;