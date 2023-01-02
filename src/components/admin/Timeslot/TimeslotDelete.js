import React, {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import AdminMenu from "../AdminMenu";
import Modal from "../../Modal";
import history from "../../../history";
import { toast } from "react-toastify";
import {fetchTimeslots, deleteTimeslot} from "../../../actions/timeslot";

const TimeslotDelete= (props) => {

  const {user} = useSelector( state => ({...state}));
  const [loading, setLoading] = useState(false);
  const [timeslots, setTimeslots] = useState([]);
  const id = props.match.params.id;

  {console.log("PROPS",props.match.params)}

  useEffect( () => {
    getTimeslots();
 }, [] );

const getTimeslots = () => {
   fetchTimeslots().then ( (res) => setTimeslots(res.data));
}

  const addRoute = () => {
    return("/admin/timeslot/timeslotcreate");
  }

  const handleDelete = () => {
    setLoading(true);
    deleteTimeslot(id, user.token)
    .then ( res => {
        setLoading(false);
        toast.success(`Timeslot deleted successfully`);
        getTimeslots();           
    })
    .catch ( (err) => {
           console.log(err);
           setLoading(false);
           if(err.response===400) 
                toast.error(err.response.data);
           else
                toast.error(err.message);
       });
 }

  const renderActions = () => {
       
    return (
      <React.Fragment>
       <button onClick= { () => {handleDelete()}    } 
          type="submit" className=" btn btn-danger primary-button mr-3">Yes</button>
       <Link to= "/admin/timeslot/listslots" 
             type="button" className= "btn btn-secondary primary-button">No</Link>
       </React.Fragment>
       );
  }

  const renderContent= () => {
       
    if(!id) {
       return ("Are you sure you want to delete this timeslot?");
    }
       return(`Are you sure you want to delete the timeslot`);
   }

    return (

        <div>
          <AdminMenu  
            addRoute= {addRoute()}
          />         
          <Modal 
            title= "Delete a Timeslot"
            content= {renderContent()}
            actions= {renderActions()}
            onDismiss = {() => history.push("/admin/timeslot/listslots") }
         />

        </div>
    )

}

export default TimeslotDelete;