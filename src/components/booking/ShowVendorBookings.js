import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {upcomingBookings} from "../../actions/vendorCalendar";

const ShowVendorBookings = () => {    

    const {user} = useSelector( (state) => ({...state}));
    const [bookings, setBookings] = useState([]);

    console.log("VALUE OF MATCH",user._id);

    useEffect( () => {
       upcomingBookings(user._id).then ( res => setBookings(res.data));
    },[])

    return (

        <div className= "row">
            <div className= "col col-md-6">

                <h2>Your upcoming bookings</h2>
                   
                {JSON.stringify(bookings)}



            </div>
            
        </div>


    );

}

export default ShowVendorBookings;