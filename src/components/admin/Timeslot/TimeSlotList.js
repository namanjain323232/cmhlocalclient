import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../navigation/AdminNav";
import AdminMenu from "../AdminMenu";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {fetchTimeslots} from "../../../actions/timeslot";

const TimeslotList= () => {

    const [timeslots,setTimeslots] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect( () => {
      loadTimeslots();
    },[]);

    const loadTimeslots= async () => {
        setLoading(true);
        fetchTimeslots().then( (res) => setTimeslots(res.data));
        setLoading(false);
    }

    const addRoute= () => {
        return("/admin/timeslot/timeslotcreate");
    }

      const renderSlots= () => (
      timeslots && timeslots.map( (t) => 
             (
                <div className="row" key= {t._id}>
                 <div className= "col col-md-4 category mb-2">
                     {t.startSlot}
                 </div>
                 <div className= "col col-md-4 category mb-2">
                     {t.endSlot}
                 </div>
                 <div className= "col-md-2 mb-1">
                <Link to= {`/admin/timeslot/editslot/${t._id}`} 
                  className= "btn btn-primary  mr-1 "><EditOutlined/>
                </Link>
                 <Link to= {`/admin/timeslot/deleteslot/${t._id}`} 
                        className= "btn btn-danger mr-1 "><DeleteOutlined/>
                 </Link>
              </div>
                </div>
            )
        )
    )

    return (
        <div className= "row">
          <div className= "col col-md-2">
              <AdminNav />
           </div> 
           <div className= "col col-md-9">
              <AdminMenu
                addRoute= {addRoute()}
             />
         { (!timeslots) 
          ? <h2>Loading.....</h2>  
          : <h2 className= "card-header font-weight-bold mt-2">Timeslots</h2>
           }
           <div className="container-fluid category-center">
           <div className="row">
             <div className= "col col-md-4">
               <h5 className="font-weight-bold d-flex justify-content-center">Start Slot</h5> 
             </div>
             <div className= "col col-md-4">
                <h5 className="font-weight-bold d-flex justify-content-center">End Slot</h5>
             </div>
           </div>

            <form>
               {renderSlots()}
             </form>
           </div>
            
              
           </div>
         

        </div>
    )
}

export default TimeslotList;