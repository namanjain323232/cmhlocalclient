import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import AdminMenu from "../AdminMenu";
import SubcategoryQuestionsForm from "./SubcategoryQuestionsForm";
import { addSubcatQuestion } from "../../../actions/subcatquestions";


const SubcategoryQuestionsCreate = () => {

    const [subquestions,setSubquestions] = useState("");
    const [loader,setLoader] = useState(false);



   const addRoute= () => {
        return("/admin/subcatquestions/subcatquestionscreate");
      }

    const  onSubmit = (formValues) => {
          console.log("From ONSUBMIT in subcat questions create",this.props);
          this.props.addSubcatQuestion(formValues);         
      }

  
        return (
            <div>
               <AdminMenu 
                addRoute= {addRoute()}
               />
               <h2 className="category-head font-weight-bold card-header"> Add New Subcategory Questions</h2> 
               <SubcategoryQuestionsForm 
                   onSubmit= {onSubmit}
               />
            </div>
        )
    }


const mapStateToProps = (state) => {
       return  { formValues: state.form.subcatQuestionsForm }   
}

export default SubcategoryQuestionsCreate;


