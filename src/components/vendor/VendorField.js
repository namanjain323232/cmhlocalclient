//logic to add fields to display data for vendor details
import React from "react";

const VendorField =  ({input, label,meta}) =>
{
 console.log("meta", meta);
return (
    <div>
       <div className="form-group mb-0 first-class">
        <label className="col-lg-label font-weight-bold">{label}</label>
        <div className="col-lg-12">
           <input className= "form-control" {...input} />
          <div className = "text-danger">
            {meta.touched && meta.error}
          </div>
           
        </div>
     </div>
    </div>
)
}

export default VendorField;