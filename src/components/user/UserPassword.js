import React from "react";
import UserNav from "../navigation/UserNav";

const UserPassword = () => {
   return(
    <div className= "container-fluid">
        <div className= "row ml-0 text-align-top">
           <div className= "col-md-6">
               < UserNav />   
           </div>
           <div className= "col-md-6">            
             <h1> User Password reset page</h1>
           </div>
        </div>
    </div>
   )
}

export default UserPassword;