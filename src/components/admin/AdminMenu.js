import React from "react";
import {Link} from "react-router-dom";

const AdminMenu= (props) => {
     
    return (
    // <div className= "container">
    <div className="row" >
      <div className = "col d-flex justify-content-center admin-class">
        <div className= "ml-3">
          <Link to= {props.addRoute} >Add New</Link>
        </div>
        <div className= "ml-3">
        <Link to= "/admin/dashboard" className= "d-flex justify-content-center admin-class">Admin</Link>
        </div>
         
      </div>
    </div>
    // </div>

    )
}

export default AdminMenu;


