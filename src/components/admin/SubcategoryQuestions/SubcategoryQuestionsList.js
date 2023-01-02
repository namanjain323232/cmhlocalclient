import React, {useState, useEffect} from "react" ;
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import AdminMenu from "../AdminMenu";
import AdminNav from "../../navigation/AdminNav";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import { fetchSubcatQuestions } from "../../../actions/subcatquestions";

const SubcategoryQuestionList = () => {

  const [subcatquestions, setSubcatquestions]= useState([]);
  const [loading, setLoading]= useState(false);

  useEffect( () => {
      loadSubcatQuestions();
  }, []);

  const loadSubcatQuestions= () => {
    setLoading(true);
    fetchSubcatQuestions().then( res => setSubcatquestions(res.data));
    setLoading(false);
  }
   
   const  addRoute= () => {
        return("/admin/subcatquestions/subcatquestionscreate");
    }

    const renderList= () => {
     
        return (           
            subcatquestions && subcatquestions.map( subquestionval => {

            {if (subquestionval._id)
            return (
                <div className= "row" key= {subquestionval.category._id} >
                  <div className= "col col-md-2 category text-left" >
                    <p > {subquestionval.category.name}</p>
                  </div>
                   {/* <div className= "col col-md-2 category text-left" key= {subquestionval.subcategory._id}>                   
                     <p > {subquestionval.subcategory.name}</p> 
                  </div>  */}
                  <div className= "col col-md-4 category text-left">

                   {subquestionval.questions.map(questionval => {
                    return (                    
                    <div className= " category text-align-center" key= {questionval. _id}>                     
                        <p className= "font-weight-bold" >  {questionval.question}</p>  
                        
                        {questionval.options.map(optionval => {
                        return(
                     <div className= "options" key= {optionval} >
                          <p >   {optionval}</p>
                      </div>  
                        )}
                        )}                 
                    </div>                    
                    ) 
                  }
                  )}       

                  </div>  

                  <div className= "col-md-4 mb-1">
                      <Link to= {`/admin/subcatquestions/subcatquestionsedit/${subquestionval._id}`}  
                                 className= "btn btn-primary  mr-1 "><EditOutlined /></Link>
                      <Link to= {`/admin/subcatquestions/subcatquestionsdelete/${subquestionval._id}`} 
                                 className= "btn btn-danger mr-1 "><DeleteOutlined /></Link>    
                   </div>      
                               
                 </div>
            )
                }
            }) 
           )}             


    
        return(
           <div className="row">
             <div className= "col col-md-2">
                <AdminNav />
             </div>
             <div className= "col col-md-10 category">
               <AdminMenu 
                   addRoute= {addRoute}
               />   
               { loading ? <h2>Loading....</h2>
                         : <h2 className="category-head font-weight-bold "> Subcategory Questions </h2>
               }          
               <div className= "container" > 
              <div className = "row p-3 bg-light ">
               <div className= "col col-md-2 ">
                 <h5 className= "font-weight-bold text-left"> Category</h5>           
               </div>
               <div className= "col col-md-2">
                <h5 className= "font-weight-bold text-left mr-2"> Sub Category</h5>             
               </div>
               <div className= "col col-md-4">
                <h5 className= "font-weight-bold text-align-left mr-2"> Questions/ Options</h5>             
               </div>
               
         </div>               
          <form>
            {/* {JSON.stringify(subcatquestions)} */}
              {renderList()}             
          </form>          
       </div> 
       </div>
     </div>
  ) }


export default SubcategoryQuestionList;