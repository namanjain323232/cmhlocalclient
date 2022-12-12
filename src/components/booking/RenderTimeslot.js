import React, {useState, useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import moment from "moment";
import _ from "lodash";

const RenderTimeslot = ({timeslotval,index,day,currentslots}) => {  

     const {dayval} = useSelector( (state) => ({...state}));
     const {timeslotsval}= useSelector( (state) => ({...state}));
     const [caldata,setCaldata] = useState([]);
     const [ color, setColor] = useState(false);
    
    const dispatch= useDispatch();
    const timeslots= [];
    
    
    //  {console.log("Current slots ZZZ", currentslots,timeslotval,index,day)}

    const handleClick= (e,timeslotval,index,day) => {
      e.preventDefault();     
      setColor(!color); 
      localStorage.setItem("dayval", day);
      if (typeof window !== "undefined")  {
        if (localStorage.getItem("timeslots")) {
          timeslots= JSON.parse(localStorage.getItem("timeslots"))
        }
        timeslots.push({ ...timeslotval,
                         count: 1})
      } 
      let unique=_.uniqWith(timeslots,_.isEqual);  
      //add to redux store
      dispatch({
        type: "SELECTED_DAY",
         payload:{ 
             dayval:  day
         }
      });

      dispatch({
            type: "SELECTED_TIMESLOT",
             payload:{ 
                 tsday:day,
                 tstimeslot:unique
             }
          });             
        
     } 
     
     const disableButtons= (timeslots,key) => {
      let newslots = new Set();
      return timeslots.filter(item => {
          let k = key(item);
          return newslots.has(k) ? false : newslots.add(k);
      });
  } 
        
  return (
             <div>    
              {/* {console.log("DAY",day)} 
              {console.log(currentslots.map(slots => moment(slots?.availability[0].start).format('DD/MM/YYYY') == moment(day) 
                                            &&  slots?.availability[0].timeslots?.some(slot => {return(slot._id == timeslotval._id)})))}  */}
              
              <button className= "btn btn-primary btn-sm font-weight-bold"
                      key={timeslotval._id}
                      disabled = {currentslots.map(slots => moment(slots?.availability[0].start).format('DD/MM/YYYY') == day &&  slots?.availability[0].timeslots?.some(slot => {return(slot._id == timeslotval._id)})).includes(true)}  
                      className=  { currentslots.map(slots => moment(slots?.availability[0].start).format('DD/MM/YYYY') == day &&  slots?.availability[0].timeslots?.some(slot => {return(slot._id == timeslotval._id)})).includes(true) ? "btn btn-secondary mb-1" : 
                                    day==dayval.dayval
                                    && timeslotsval.timeslotsval.some(slot => {return slot.tstimeslot[0]._id == timeslotval._id})
                                    ?  "btn btn-danger mb-1" :  "btn btn-primary mb-1"}
                       value= {timeslotval._id}
                        onClick= {(e) => handleClick(e,timeslotval,index,day)} 
                                             
              >
                    {timeslotval.startSlot}-{timeslotval.endSlot}
                    
               </button>
             
             </div>      
     
       
  )
}

export default RenderTimeslot;