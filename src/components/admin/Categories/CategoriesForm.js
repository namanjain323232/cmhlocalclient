import React from "react";
import {reduxForm,Field} from "redux-form";
import VendorField from "../../vendor/VendorField";

const CategoriesForm = ({handleSubmit, name, setName, imgURL, setImgURL, hide, setHide, unhide,setUnhide}) =>
{

const renderError = ({touched, error}) => {

      if( touched && error)  {
       return(
        <div className= "alert alert-danger mt-2">
          <div className= "header">{error}</div>
       </div>
       ) }
 }


   return(
    <form onSubmit= {handleSubmit}>   
     <div className= "form-group">
     <div className= "row mt-2">         
         <div className= "col col-md-12">
         <label className= " admin-class">Name</label>
         <input 
                type = "text"
                name= "name"
                className= "form-control"
                placeholder= "Enter Category" 
                onChange= {(e) => setName(e.target.value)}
                value= {name}   
                autoFocus         
          />         
          <label className= "admin-class mt-2">Image Link</label>         
          <input
                 type= "text"
                 name= "imgURL"
                 className= "form-control"
                 placeholder= "Enter Image Link" 
                 onChange= {(e) => setImgURL(e.target.value)}
                 value= {imgURL}              
          />
         <p className= "admin-class ml-4 mt-2">Hide Category</p>            
         <select
                 value= {hide === "Yes" ? "Yes":"No"}
                 name= "hide"
                 className= "form-control"
                 onChange= {(e) => setHide(e.target.value)}
                          
          > 
          <option value="No">No</option>
          <option  value="Yes">Yes</option>
          </select>         
         </div>  
         
     </div>
    </div>
     <div className= "d-flex justify-content-center mt-2  ">
      <button type="submit" className = "btn btn-primary font-weight-bold " name="category">Save</button>  
      </div>     
  </form>
    )
   }
    
 

export default  CategoriesForm;

