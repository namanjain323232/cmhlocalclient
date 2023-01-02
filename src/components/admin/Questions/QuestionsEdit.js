import _ from "lodash";
import React, {useState, useEffect} from "react";
import { useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import { editQuestion, fetchQuestion} from "../../../actions/questions";
import AdminMenu from "../AdminMenu";
import QuestionsForm from "./QuestionsForm";

const QuestionsEdit = ({match}) => {

    const {user} = useSelector( (state) => ({...state}));
    const [question,setQuestion] = useState("");
    const [options,setOptions] = useState([]);
    const [loading,setLoading] = useState(false);
    
   useEffect( () => {
      loadQuestion();
   },[]);

   const loadQuestion= () => {
       setLoading(true);
       fetchQuestion(match.params.id)
       .then ( (res) => {
           setQuestion(res.data.question);
           setOptions(res.data.options);
           setLoading(false);
       })
       .catch ( (err) => {
           console.log(err);
           setLoading(false);
           toast.error(`Could not find the question record:${err.message}`);
       });
   }
    
    const addRoute =() => {
        return("/admin/questions/questionscreate");
     } 

    const handleSubmit = (e) => {
       e.preventDefault();
       setLoading(true);
       editQuestion(match.params.id,
                {question: question.question, options: question.options},
                 user.token) 
       .then ( (res) => {
           setLoading(false);
           setQuestion("");
           setOptions("");
           toast.success(`${res.data.question} has been updated successfully!!!!`);
       })
       .catch (err => {
           console.log(err);
           setLoading(false);
           if(err.response===400) 
              toast.error(err.response.data);
           else
              toast.error(err.response);
       });
    }
        
     return (
        <div>
           <AdminMenu 
             addRoute= {addRoute()}
           />
           { loading ? <h2>Loading....</h2>
                     : <h2 className="category-head font-weight-bold card-header">Edit Question</h2>
           }

       <QuestionsForm  
        // initialValues =  { _.pick(this.props.questions, "question", "options")}
        handleSubmit= {handleSubmit}
        question= {question} 
        setQuestion= {setQuestion} 
        options= {options} 
        setOptions= {setOptions}          
        />          
       </div>        
       )
    }

export default QuestionsEdit;