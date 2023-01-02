import React from "react";
import {Link} from "react-router-dom";
import { Field, reduxForm } from "redux-form";

class Subcategories extends React.Component {

  renderError({touched, error}) {

      if( touched && error)  {
       return(
        <div className= "alert alert-danger mt-2">
          <div className= "header">{error}</div>
       </div>
       ) }
 }

   renderInput = ({input, placeholder, meta})  => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
          return (            
           <div className= {className}  >               
            <input className= "form-control" {...input } placeholder= {placeholder}/>  
            {this.renderError(meta)}  
           </div>     
           ) 
  }

  onSubmit(formValues) {
    console.log(formValues) ;
  }

  render() {
    
    return (
      <div >
        <Link to= "/admin" className= "d-flex justify-content-center admin-class">Admin</Link>
        <h1 className="category-head">Add Subcategories</h1>
       <form onSubmit= {this.props.handleSubmit(this.onSubmit)}className="form-group row  mb-3 ml-4">
        <div className= "col-lg-4">
        <Field name= "category" component= "select" label= "Category" className= "form-control mb-3">
         <option value= ""> Select a category</option>  </Field>
         </div>
         <div className= "col-lg-4"  >
        <Field name= "subcategory"  component= {this.renderInput} label= "Subcategory" placeholder= "Enter the subcategory" />  
        </div>  
         <button className= "btn btn-primary btn-md primary-button">Add</button>                 
      </form>
      </div>
    ) 
  }
 
}

const validate = (formValues) =>
{
  const errors = {};
  if(!formValues.subcategory) {
    errors.subcategory= "Please select a Category";
  }
  if(!formValues.subcategory) {
    errors.subcategory= "Please enter a Subcategory";
  }
    return errors;
}

export default reduxForm({
  form : "subCategories",
  validate: validate
 })(Subcategories); 
