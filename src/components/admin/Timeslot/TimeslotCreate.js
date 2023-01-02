import React, {useState,useEffect} from "react";
import {toast} from "react-toastify";
import AdminNav from "../../navigation/AdminNav";
import {addTimeslot} from "../../../actions/timeslot";
import {useSelector} from "react-redux";

const TimeslotCreate= () => {

   const {user} = useSelector( state => ({...state}));
   const [startslot, setStartslot] = useState("");
   const [endslot, setEndslot] = useState("");
   const [loading,setLoading]= useState(false);
   
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        addTimeslot({startslot,endslot},user.token)
        .then ( (res) => {
            setLoading(false);
            setStartslot("");
            setEndslot("");
            toast.success(`Successfully created timeslot`);
           })
           .catch (err => {
             console.log(err);
             setLoading(false);
             if(err.response===400) 
                toast.error(err.response.data);
             else
                 toast.error(err.response);
           })
      };
        
    return ( 
 
        <div className= "row mt-5">
        <div className= "col col-md-3" >
          <AdminNav />
        </div>         
         <div className= "col col-md-8 mt-2">
         <h1 className= "font-weight-bold d-flex justify-content-center mb-4">Add New Timeslots</h1>
         <form onSubmit= {handleSubmit}>
         <div className="row d-flex justify-content-center mb-4">
         <div className="col col-md-3">
           <input 
             type="text"
             name="startslot"
             className= "form-control"
             placeholder= "Start Slot" 
                onChange= {(e) => setStartslot(e.target.value)}
                value= {startslot}   
                autoFocus         
            />
          </div>
           <div className="col col-md-3">
            <input 
             type="text"
             name="endslot"
             className= "form-control"
             placeholder= "End Slot" 
                onChange= {(e) => setEndslot(e.target.value)}
                value= {endslot} 
             />  
            </div> 
            </div>       
           <div className= " d-flex justify-content-center mt-3  ">
             <button type="submit" className = "btn btn-primary font-weight-bold " name="timeslot">Save</button>  
           </div>  
         </form>        
        
        </div>
        </div>
    )

}

export default TimeslotCreate;