import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import VendorNav from "../../navigation/VendorNav";
import {fetchVendorCalendar} from "../../../actions/vendorCalendar";
import VendorCalCard from "../../cards/VendorCalCard";

const VendorCalendarList = () => {

    const {user} = useSelector( state => ({...state}));
    const [vendorCal, setVendorCal] = useState([]);
    const [loading, setLoading] = useState("false");

   useEffect (() => {
      loadVendorCalendar();
   }, []);

  
   const loadVendorCalendar= () => {
    setLoading(true);
    fetchVendorCalendar(user._id)
    .then (res => setVendorCal(res.data));
    setLoading(false);
   }
   
  
    return (
        <div className= "row">
         <div className= "col col-md-3">
        <VendorNav />
        </div>  
       <div className = "col col-md-9 "> 
        <div className= "row">
         <li className= "col d-flex justify-content-end mb-2 font-weight-bold admin-class">
            <Link to= {`/vendor/vendorcalcreate/${user._id}`} className= "nav-link font-weight-bold"><button>Add New Calendar Availability</button></Link>
         </li>
         <li className= "col d-flex justify-content-start admin-class mb-2">
            <Link to= {`/vendor/vendorcalbulk/${user._id}`} className= "nav-link"><button>Add Bulk Booking</button></Link>
         </li>
         </div> 
         { loading ? <h4>Loading....</h4>
                      :  <h4 className= "font-weight-bold"> Your Current Bookings</h4>
         }

         <div className= "row pb-3">
            { vendorCal.map( (cal) => {
             return (
              <div className= "col col-md-4"  key= {cal._id}>                              
               <VendorCalCard  cal= {cal}                                
               />
               </div>
             )
            })
            } 
            </div> 
           
         <div>

         </div>  
       </div>

        </div>
    )

}

export default VendorCalendarList;