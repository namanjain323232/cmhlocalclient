import React, {useState,useEffect} from "react";
import {editTimeslot, fetchTimeslot} from "../../../actions/timeslot";
import {useSelector} from "react-redux";
import AdminMenu from "../AdminMenu";
import AdminNav from "../../navigation/AdminNav";
import {toast} from "react-toastify";

const TimeslotEdit= ({match}) => {

    const {user} = useSelector( state => ({...state}));
    const [startslot,setStartslot] = useState("");
    const [endslot, setEndslot] = useState("");
    const [loading,setLoading] = useState(false);

    const id= match.params.id;

    useEffect( () => {
       loadTimeslot(); 
    },[]);

    const loadTimeslot= () => {
        fetchTimeslot(id).then ( (res) => 
        {
            setStartslot(res.data.startSlot)
            setEndslot(res.data.endSlot)
        })
    }

    const addRoute= ()=> {
        return("/admin/categories/categoriescreate");
     } 

     const handleSubmit= (e) => {
        e.preventDefault();
        setLoading(true);
        editTimeslot(id,{startSlot: startslot, endSlot: endslot },user.token)
        .then ( res => {
            setLoading(false);
            toast.success(`timeslot is updated successfully`);  
            setStartslot("");
            setEndslot("");            
        }).catch (err => {
            console.log(err);
            setLoading(false);
            if(err.response===400) 
               toast.error(err.response.data);
            else
                toast.error(err.response);
          })
     }

    return ( 
 
        <div className= "row mt-5">
        <div className= "col col-md-3" >
          <AdminNav />
        </div>         
         <div className= "col col-md-8 mt-2">
         <h1 className= "font-weight-bold d-flex justify-content-center mb-4">Edit Timeslots</h1>
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
             <button type="submit" className = "btn btn-primary font-weight-bold " name="timeslot">Edit</button>  
           </div>  
         </form>        
        
        </div>
        </div>
    )

}

export default TimeslotEdit;
