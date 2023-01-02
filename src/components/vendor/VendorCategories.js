import React from "react";
import { reduxForm, Field} from "redux-form";
import {withRouter} from "react-router-dom";
import VendorField from "./VendorField";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { submitVendor} from "../../actions";
import { submitVendorCategories} from "../../actions";

const VendorCategories = (props) => {

   const { handleSubmit } = props;
   function renderCategories() {
      return(
      <div>
            <Field  
             type= "text"
             label= "Category"
             name= "subcategory"
             component= {VendorField}    />
             <Field  
             type= "text"
             label= "Areas Covered"
             name= "areascovered"
             component= {VendorField}    />
            <Field  
             type= "text"
             label= "Price Type"
             name= "pricetype"
             component= {VendorField}    />
            <Field  
             type= "text"
             label= "Price"
             name= "price"
             component= {VendorField}    />
             <Field  
             type= "text"
             label= "Website"
             name= "website"
             component= {VendorField}    />
      </div>
      )
    }

   function onSubmit()  {
      console.log("Form values from on submit", props.formValues.vendorForm);
      props.submitVendor(props.formValues.vendorForm.values);
      props.submitVendorCategories(props.formValues.vendorCategories.values);
    } 
    
   
    return(
    <div>        
        <h1 className="h2 font-weight-bold card-header">Add Categories Details</h1>
                
             <section className= "vendor-center">
             <div className="card">
             <div className="card-body">
             <form onSubmit= {handleSubmit(() => onSubmit())}>
               {renderCategories()}
               <div className= "row">
               <div className= "col pull-left mt-2">
               <button 
                  className= "btn btn-md btn-warning font-weight-bold "
                  onClick = {props.onCancel}
                >Back</button>
               </div>
               <div className= "col-pull-right mt-2 mr-3">
               <button type="submit" 
                    //   onClick = {() => props.submitVendor(props.formValues.vendorForm, props.history)}
                      className= "btn btn-md btn-primary font-weight-bold ">Submit</button>
               </div>
               </div>
            </form> 
             </div> 
            </div>
            </section>
            </div>  
    )      
}



function validate(values)
{
  const errors = {};

  if (!values.category) 
  {
      errors.category = "Please select the category";
  }
  if (!values.areascovered) 
  {
      errors.areascovered = "Please select the Areas Covered";
  }
  if (!values.pricetype) 
  {
      errors.pricetype = "Please select the Price Type";
  }
  if (!values.price) 
  {
      errors.price = "Please select the Price";
  }
   return errors;
}

function mapDispatchToProps(dispatch)  {
    return bindActionCreators({
           submitVendor: submitVendor,
           submitVendorCategories: submitVendorCategories
           }, dispatch);
  };

function mapStateToProps(state) {
    console.log("In state:", state);
    return { formValues: state.form};
}

const formWrapped = reduxForm( {
    validate: validate,
    form: "vendorCategories",
   destroyOnUnmount: false
})(withRouter(VendorCategories));

export default connect(mapStateToProps,mapDispatchToProps)(formWrapped);