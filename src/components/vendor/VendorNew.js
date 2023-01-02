//This form shows vendor login details and the categories selected

import React, {Component} from "react";
import {reduxForm} from "redux-form";
import VendorForm from "./VendorProducts/VendorForm";
import VendorCategories from "./VendorCategories";

class VendorNew extends Component {
 

  state = {showVendorCategories: false};

  renderContent() {
   if (this.state.showVendorCategories) {
     
     return <VendorCategories onCancel = { () =>
                          this.setState({showVendorCategories: false})  } />
   }
    return  <VendorForm  onVendorSubmit = { () => 
                        this.setState({showVendorCategories: true})}/>
  }

render() {
 
return(
  
  <div>
      {this.renderContent()}
  </div>    
)}
}

export default reduxForm({
         form: "vendorForm" }
)(VendorNew);