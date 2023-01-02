import React, {useState, useEffect} from "react";
import {fetchTimeslots} from "../../../actions/timeslot";
import {toast} from "react-toastify";
import moment from "moment";
import {useSelector} from "react-redux";
import {addBulkAvail} from "../../../actions/vendorCalendar";


const BulkTimeslots= ({match}) => {
 {console.log("NOW in bulk timeslots",match.params)}
const {user} = useSelector( state => ({...state}));
const [timeslots, setTimeslots]= useState([]);
const [caldata,setCaldata] = useState([]);
const [loading,setLoading] = useState(false);
const [clicked,setClicked] = useState("");
const days= [];

useEffect( () => {
    fetchTimeslots().then( res => setTimeslots(res.data));
  },[]);

  const handleClick= (e,t,index) => {
    e.preventDefault();
    timeslots && timeslots.map ( (slot,i) => {
      if (clicked.includes(index)) {
        const temp = [...clicked];
        const tempCal= [...caldata];
       // removing the element using splice
        temp.splice(temp.indexOf(index),1);
        tempCal.splice(temp.indexOf(index),1);
      // updating the list
        setClicked(temp);
        setCaldata(tempCal);
        return;
      }
      if (i === index) {        
        setClicked(prevArray => [...prevArray, i]);
        setCaldata(prevArray => [...prevArray, e.target.value]);                 
      } else {
        return slot
      }
       })
     }

  const handleSubmit= (e) => {
     e.preventDefault();
     const noOfDaysA= moment(match.params.toDate).diff(moment(match.params.fromDate),"days");
     console.log("NO OF days",noOfDaysA);
     for (let i=0; i< noOfDaysA; i++) {
         days.push( moment(match.params.fromDate).add(i, 'days')+1);
       }
       console.log("DAYS",days);
     for (let j=0; j < days.length; j++)
       {
         addBulkAvail(user._id,{vendorInfoId: user._id, 
                                timeslots: caldata,                     
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

return (

    <div className= "row"> 
      <div className= "col col-md-12 d-flex justify-content-center">
     <form>

         <div className= "row">

             <h6 className= "font-weight-bold mt-2 mb-2 mr-3">Bulk booking from : {moment(match.params.fromDate).format("DD/MM/YYYY")}</h6>
             <h6 className= "font-weight-bold mt-2 mb-2 ml-3">To :  {moment(match.params.toDate).format("DD/MM/YYYY")}</h6>
         </div>
          {timeslots && timeslots.map( (t, index) => (
              <div className= "font-weight-bold d-flex justify-content-center mt-1"
                   key= {t._id}>
                <button className=  { !clicked.includes(index) ? "btn btn-primary" : "btn btn-danger"}
                        value= {t._id}
                        onClick= {(e) => handleClick(e,t,index)}                        
                >  
                 {t.startSlot} - {t.endSlot} </button>
              </div>
             ))
         }
          <div className= "row  mt-3">
              <div className= "col col-md-12 d-flex justify-content-center" >
               <button className="btn btn-secondary font-weight-bold"
                      onClick= {handleSubmit}> Submit your Bulk Availability</button>
             </div>
          </div>
     
     
     </form>    
     

      </div>

    </div>

)

}

export default BulkTimeslots;