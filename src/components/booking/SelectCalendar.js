import React, {useState} from "react";
import { Calendar, Alert } from 'antd';
import {Link} from "react-router-dom";
import moment from 'moment';
import SelectTimeslot from "../booking/SelectTimeslot";

const SelectCalendar= ({vendor}) => {

    
    const [value, setValue] = useState(moment(new Date()));
    const [selectedValue, setSelectedValue] = useState(moment(new Date));
    
    const onSelect = value => {
        setValue(value);
        setSelectedValue(value); 
        <SelectTimeslot 
          selectedValue= {value}
          vendor= {vendor}
        />             
      }
    const onPanelChange = value => {
           setValue(value);
      };
    
    return (        

      <div className= "row d-flex justify-content-center">
        <div className= "col col-md-6 font-weight-bold mb-2">
        {!selectedValue 
        ? <button 
            className= "btn btn-secondary mb-2 d-flex justify-content-center"
            disabled
            >Book Timeslot
           </button>        
        :<Link to= {`/selectslot/${vendor}/${selectedValue}`} 
                 className= "btn btn-danger mb-2 d-flex justify-content-center">Book Timeslot
          </Link>
        }
       <Alert
          message={`You selected date: ${selectedValue}`}
        />
        
        <Calendar value={value} 
                  onSelect={onSelect} 
                  onPanelChange={onPanelChange}   
                  disabledDate= { (current => 
                    current && current.valueOf() < moment().subtract( 1 - "days"))}              
         />
        </div>
      </div>
  )

}

export default SelectCalendar;




