import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {fetchTimeslots} from "../../actions/timeslot";
import {fetchVendorCalendar, fetchVendorCalendarVend} from "../../actions/vendorCalendar";
import SelectCalendar from "../booking/SelectCalendar";

const BookVendor = ({match}) => {

    const [timeslots, setTimeslots] = useState([]);
    const [vendorCal, setVendorCal] = useState([]);
    const [loading, setLoading] = useState(false);
    {console.log("MATCH", match.params.id)}
    useEffect( () => {
        setLoading(true);
        fetchTimeslots()
        .then ( (res) => setTimeslots(res.data));
        setLoading(false);
    },[]);
    
    useEffect( () => {
       setLoading(true);
       fetchVendorCalendarVend(match.params.id)
       .then ( (res) => setVendorCal(res.data));
       setLoading(false);
    },[]);


    {console.log("VENDORCAL",vendorCal)}
    const renderList = () => (
         vendorCal && vendorCal.map ( vc => {
         return (
               <div className= "row" key= {vc._id}>
                 <div className= "col col-md-3">
                    {vc.availability[0].start}   
                 </div>
                 <div className= "col col-md-3">
                    {vc.availability[0].end}   
                 </div>
                  <p>{vc.availability.endSlot}</p>                     
              </div>
            )
         }
         )         
    )

       
    return (
      <div className= "container-fluid category-center">
       <div className= "row d-flex justify-content-center mb-2">
        { loading ? <h2>Loading....</h2>
                  : <h6 className= "font-weight-bold ">Select a date to Check Vendor Availability</h6>
        }
        
         <div className= "row">
          <div className= "col col-md-12 mt-2">
          <form>

            <SelectCalendar 
              vendor= {match.params.id} /> 
           {/* {renderList()}  */}
           </form>
            
         </div>
         </div>

       </div>
       </div>

    )

}

export default BookVendor;