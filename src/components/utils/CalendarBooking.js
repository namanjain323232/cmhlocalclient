import React, {useState} from "react";
import CalendarTemplate from "availability-calendar-react";

const CalendarBooking= () => {

    const [availability,setAvailability] = useState([]);
    const Calendar= CalendarTemplate({
         availability,
         setAvailability
    });

    return (
        <div>          
            <Calendar /> 
        </div>
    )

}

export default CalendarBooking;