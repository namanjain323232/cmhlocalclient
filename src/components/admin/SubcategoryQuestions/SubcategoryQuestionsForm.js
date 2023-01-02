import React, {useState, useEffect} from "react";
import {useSelector } from "react-redux";
import {fetchCategories,fetchCategorySubs} from "../../../actions/category";
import { fetchQuestions} from "../../../actions/questions";
import {Select,Form, Input, Button} from 'antd';
import { MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';

const {Option} = Select;

const SubcategoryQuestionsForm = () => {

  const {user} = useSelector( state => ({...state}));
  const [categories, setCategories] = useState([]); 
  const [subOptions, setSubOptions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [ loading, setLoading] = useState(false);
  const  [category,setCategory] = useState("");
  const [subcategory,setSubcategory]= useState("");
  const [question,setQuestion] = useState("");
  const [fields, setFields]= useState([]);

  useEffect( () => {
     loadCategories();
     loadQuestions();
  },[]);

  
  const loadCategories= () => {
     setLoading(true);
     fetchCategories().then ( (res) => setCategories(res.data)); 
     setLoading(false);    
  } 

  const handleCategoryChange= (e) => {
      e.preventDefault();
      setCategory(e.target.value);
      fetchCategorySubs(e.target.value)
       .then ( (res) => setSubOptions(res.data)
       )
      .catch ( (err) => {
         console.log(err);
    })
    // setShowSubs(true);
  }

  const loadQuestions= () => {
     setLoading(true);
     fetchQuestions().then( (res) => setQuestions(res.data));
     setLoading(false);
  }  

  const handleSubmit = (formValues) => {
    console.log(formValues);   
  }         
    
  const renderQuestions = () => {              
    return (
      <div>
      {fields.map( (question,index) => {
       return (
       <div className= "row form-group" key={index}> 
        <div className= "col col-md-12 mt-0">
        <select
          name={question}
          className="form-control"
          value={`question${index+1}`}
          label={`question #${index + 1}`}
        >              
         <option value="">Select a Question</option>
           {questions && questions.map( questionVal => {
            return( <option key={questionVal._id} 
                          value= {questionVal._id}>{questionVal.question}
                    </option>)
         }) }  
         </select> 
       </div>
       </div>
       )
    })
  }
  </div>
  )}
  
      
        return(
            <div>
                <section className= "question-center mb-2">
                
                    <div className= "card" >
                    <div className= "card-body">
                    <form onSubmit = {handleSubmit} >
                       <div className= "row">
                         <div className= " col col-md-12">
                         <label className= "font-weight-bold h6 mt-2">Select a Category </label>
                         <select
                              name= "category"
                              className= "form-control"
                             onChange= { handleCategoryChange}
                          >
                        <option value="">Select a Category</option>          
        
                       { categories && categories.map( categoryVal => {
                         return( <option key={categoryVal._id} 
                               value= {categoryVal._id}
                        >{categoryVal.name}
                       </option>) }
                        )}  
                     </select> 
                       </div>
                      
                   <div className= "col col-md-12">
                      <label className= "admin-class mt-1 mb-1">Select a Sub category</label>
                      
                      <select 
                           name= "subcategory"   
                           className= "form-control"
                           onChange= { subcategory => setSubcategory(subcategory)}
                       > 
                      <option value="">Select a Sub Category</option>                  
                     { subOptions && subOptions.map( (s) => {
                     return (  <option key= {s._id} value= {s._id}>
                            {s.name}
                         </option> ) }
                     )}
                   </select>                  
                   </div>
                  </div>

                  {renderQuestions()}
                  {/* <div className="col col-md-12">
                      <button className= "btn btn-warning mt-2">Add a question</button>
                  </div>
                  <div className= "col col-md-12 mt-2">
                   <select
                              name= "question"
                              className= "form-control"
                              onChange= {question => setQuestion(question)}
                   >                                 
                  <option value="">Select a Question</option>
                   {questions && questions.map( (q) => {
                    return( <option key={q._id} value= {q._id}>
                                {q.question}
                            </option> ) }
                   ) }  
                  </select> 
                  </div> */}
                  <div className= "d-flex justify-content-center mt-2" >         
                       <button type= "Submit" className= "btn btn-primary font-weight-bold"> Submit</button>
                  </div>
                
                           
                    
                    </form> 
                    </div>
                      
                    </div> 
                   
                    
                </section>
            </div>
        )
    }




const mapStateToProps = (state) => {
    console.log("state from mapstate in subcat ques YYY",state.questions);
    return   {  catValues: Object.values(state.categories),
                subcatValues: Object.values(state.subcategories),
                questionsValues: Object.values(state.questions) }            
      }  


export default SubcategoryQuestionsForm;

