import React, {useState} from "react";
import UserNav from "../navigation/UserNav";
import {auth} from "../../firebase";
import {toast} from "react-toastify";


const UserPassword = () => {

    const [password,setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit= async (e) => {
      e.preventDefaults();
      setLoading(true);
      await auth.currentUser.updatePassword(password)
      .then ( () => {
         setLoading(false);
         setPassword("");
         toast.success("Your Password has been updated");
      })
      .catch (err => {
         console.log(err)
         setLoading(false);
         toast.err(err.message);
      }); 


    }

    const passwordUpdateForm = () => {
        return(
        <form>
          <div className= "card form-group">
           <div className= "card-body">
            <label className= "font-weight-bold category">Update password</label>
            <input type="password" 
                   onChange= { (e) => setPassword(e.target.value)}
                   className= "form-control"
                   placeholder= "Enter new password"
                   value= {password}
                   disabled= {loading}
            />
             <div className= "d-flex justify-content-center mt-2">
              <button className="btn btn-primary"
                      disabled= {!password || password.length <6 || loading}
              >Submit</button>
              </div>
          </div>          
          </div>
        </form>
        )
    }

   return(
    <div className= "container-fluid mt-2">
        <div className= "row ml-0 text-align-top">
           <div className= "col-md-3">
               < UserNav />   
           </div>
           <div className= "col-md-4">            
            {loading ? (<h4 className= "card-header"> Loading... </h4>)
                     : (<h4 className= "card-header"> Reset Password </h4>)
             } 
              {passwordUpdateForm()}
           </div>
        </div>
    </div>
   )
}

export default UserPassword;