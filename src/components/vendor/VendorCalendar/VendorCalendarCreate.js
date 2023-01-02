import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import VendorNav from "../../navigation/VendorNav";
import { DatePicker } from "antd";
import { fetchTimeslots } from "../../../actions/timeslot";
import { addVendorCalendar, readVendorCalendar, fetchVendorCalendarCurrent } from "../../../actions/vendorCalendar";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import moment from "moment";

const VendorCalendar = ({ match }) => {

  const { user } = useSelector(state => ({ ...state }));
  const [fromDate, setFromDate] = useState(""); // DatePicker = DD/MM/YYYY | API need to conver in YYYY-MM-DD
  const [timeslots, setTimeslots] = useState([]);
  const [currentBooking, setCurrentBooking] = useState('');
  const [clicked, setClicked] = useState([]);
  const [caldata, setCaldata] = useState([]);
  const [loading, setLoading] = useState(false);
  let currentDate = [];


  useEffect(() => {
    fetchTimeslots().then(res => setTimeslots(res.data));
  }, []);


  //   { loading ?  <h2>"loading..."</h2> : console.log(currentBooking)
  //   //  : console.log("CURRENT BOOKING",currentDate= moment(currentBooking.availability[0].start).format("YYYY-MM-DD"), fromDate)
  // }
  // { loading ?  <h2>"loading..."</h2>
  //   :  currentDate= moment(currentBooking.availability[0].start).format("YYYY-MM-DD") 
  // }

  const getDateForApiFormat = (dateStr) => {
    let dtstr = "";
    if (dateStr) {
      let dtArr = dateStr.split("/");
      if (dtArr && dtArr.length) {
        dtstr = dtArr[2] + "-" + dtArr[1] + "-" + dtArr[0];
      }
    }
    return dtstr;
  }

  const handleClick = (e, t, index) => {
    e.preventDefault();
    timeslots && timeslots.map((slot, i) => {
      if (clicked.includes(index)) {
        const temp = [...clicked];
        const tempCal = [...caldata];
        // removing the element using splice
        temp.splice(temp.indexOf(index), 1);
        tempCal.splice(temp.indexOf(index), 1);
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

  const loadCurrentBookings = async () => {
    setLoading(true);
    let dtstr = getDateForApiFormat(fromDate);
    return await fetchVendorCalendarCurrent(user._id, dtstr)
      .then(res => {
        // https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
        setCurrentBooking(res.data);
        setLoading(false);
        return res.data;
      }).catch(err => {
        console.log(err);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let currentBooking = await loadCurrentBookings();
    let currentDateStr = "";
    console.log("CURRE DATE", currentBooking);

    if (currentBooking) {
      currentDate = moment(currentBooking.availability[0].start).format("YYYY-MM-DD");
      currentDateStr = moment(currentBooking.availability[0].start).format("DD/MM/YYYY");
    }

    let dtstr = getDateForApiFormat(fromDate);

    if (!fromDate) {
      toast.error("Please select the booking date");
    } else if (caldata.length === 0) {
      toast.error("Please select the slots to book");
    } else if (currentDateStr == fromDate) {
      toast.error("Bookings already exist for this date. Please go to edit bookings");
    } else {
      setLoading(true);
      addVendorCalendar(user._id, {
        vendorInfoId: user._id,
        availability: [{
                        start: dtstr,
                        timeslots: caldata
                      }]
        }, user.token)
        .then((res) => {
          setLoading(false);
          toast.success("Successfully created calendar booking");
          // setTimeout( () => {
          //   window.location.reload();
          // },1000);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          if (err.response === 400)
            toast.error(err.response.data);
          else
            toast.error(err.response);
        })
    }
  }


  return (
    <div className="row">
      <div className="col col-md-2 mt-1">
        <VendorNav />
      </div>
      <div className="col col-md-10">
        {(loading)
          ? <h2>Loading.....</h2>
          : <h2 className="font-weight-bold">Add your Availability</h2>
        }

        <form onSubmit={handleSubmit} >
          <div className="col d-flex justify-content-center">
            <DatePicker
              className="site-calendar-card mt-1 ml-4 h6"
              placeholder="Enter booking date"
              size="large"
              format="DD/MM/YYYY"
              onChange={(date, dateString) =>
                setFromDate(dateString)
              }
              disabledDate={(current =>
                current && current.valueOf() < moment().subtract(1 - "days"))}
            />

          </div>
          <br />
          {timeslots && timeslots.map((t, index) => (
            <div className="font-weight-bold d-flex justify-content-center mt-1"
              key={t._id}>
              <button className={!clicked.includes(index) ? "btn btn-primary" : "btn btn-danger"}
                value={t._id}
                onClick={(e) => handleClick(e, t, index)}
              >
                {t.startSlot} - {t.endSlot} </button>
            </div>
          ))
          }

          <div className="row  mt-3">
            <div className="col col-md-6 d-flex justify-content-end" >
              <button className="btn btn-secondary font-weight-bold"
                type="submit"> Submit your Availability</button>
            </div>

            <div className="col col-md-6 d-flex justify-content-start">
              <Link to={`/vendor/vendorcallist/${user._id}`}
                type="button" className="btn btn-secondary font-weight-bold">Back</Link>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

export default VendorCalendar;