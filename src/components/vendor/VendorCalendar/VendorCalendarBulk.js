import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import VendorNav from "../../navigation/VendorNav";
import {addBulkBooking,addBulkAvail} from "../../../actions/vendorCalendar";
import BulkTimeslots from "./BulkTimeslots";
import {DatePicker} from "antd";
import {toast} from "react-toastify";
import moment from "moment";

const VendorCalendarBulk = () => {

    const {user} = useSelector( state => ({...state}));
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [loading,setLoading] = useState(false);
    const days= [];

   
    const handleSubmitUnavail= (e) => {
        e.preventDefault();
        setLoading(true); 
        const noOfDaysU= moment(toDate).diff(moment(fromDate),"days") +1;
        console.log("NO OF days",noOfDaysU);
        for (let i=0; i< noOfDaysU; i++) {
            days.push( moment(fromDate).add(i, 'days')+1);
          }
          console.log("DAYS",days);
        for (let j=0; j <= days.length; j++)
          {
            addBulkBooking(user._id,{vendorInfoId: user._id,                      
                                 start: days[j]                                        
                             },user.token)
            .then ( (res) => {
               console.log(res.data);
            })
           .catch ( err => {
            console.log(err);
            setLoading(false);
            if(err.response===400) 
                  toast.error(err.response.data);
            else
                  toast.error(err.response);
            })   
         }
           setLoading(false);
           toast.success("Successfully created bulk calendar bookings");      
      } 

   const handleSubmitAvail= (e) => {
        console.log("IN handle submit AVAIL");
        <BulkTimeslots 
          fromDate= {fromDate}
          toDate={toDate}
        />
      } 


return (
  <div className= "row">
      <div className="col col-md-3 mt-1">
           <VendorNav />
       </div>
       <div className= " col col-md-9 mt-2 ">
       <h2 className="font-weight-bold">Add your Bulk Booking</h2>
       <form>
        <div className= "col d-flex justify-content-center" >
       <DatePicker
              className="site-calendar-card mt-2 ml-4 h6"
              placeholder="Enter booking start date"
              size= "large"
            //   format= "DD/MM/YYYY"          
              onChange= {(date,dateString) => 
                        setFromDate(dateString)
                       }
              disabledDate= { (current => 
                    current && current.valueOf() < moment().subtract( 1- "days"))}
        />  
        <DatePicker
              className="site-calendar-card mt-2 ml-4 h6"
              placeholder="Enter booking end date"
              size= "large"
            //   format= "DD/MM/YYYY"          
              onChange= {(date,dateString) => 
                        setToDate(dateString)
                       }
              disabledDate= { (current => 
                    current && current.valueOf() < moment().subtract( 1- "days"))}
        /> 
          </div>
          <div  className="row mb-4">
              <div className= "col d-flex justify-content-end mt-3">
                 <Link to= {`/vendor/bulktimeslots/${user._id}/${fromDate}/${toDate}`} className= "btn btn-primary font-weight-bold">Submit your Bulk Availability</Link>
               </div>
               <div className= "col d-flex justify-content-start mt-3">
                <button className="btn btn-danger font-weight-bold"
                      onClick= {handleSubmitUnavail}> Submit your Bulk Unavailability
                </button>
               </div>
           </div>
            <div className= "row mt-4 d-flex justify-content-center">

                <p className= "font-weight-bold "> *Book block dates of all slots available or your holiday/unavailable dates</p>
            </div>
            
         </form>
       </div>

  </div>

)

}

export default VendorCalendarBulk;


