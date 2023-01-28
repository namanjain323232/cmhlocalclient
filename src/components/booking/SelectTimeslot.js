import React, { useState, useEffect } from "react";
import { List, Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTimeslots, fetchBlockedTimeslots } from "../../actions/timeslot";
import moment from "moment";
import RenderTimeslot from "./RenderTimeslot";
import _ from "lodash";
import { fetchVendorCalendarDate } from "../../actions/vendorCalendar";
import { getVendorCategory } from "../../actions/vendor";

const SelectTimeslot = ({ match }) => {
  {
    console.log(
      "Selected Date XXXX",
      match.params.vendor,
      match.params.selectedvalue
    );
  }

  const { dayval, timeslotsval } = useSelector((state) => ({ ...state }));
  const [timeslots, setTimeslots] = useState([]);
  const [blockedTimeslots, setBlockedTimeslots] = useState([]);
  const [currentslots, setCurrentslots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tooltip, setTooltip] = useState("Click to add");
  const [vendata, setVendata] = useState("");

  const days = [];

  const dispatch = useDispatch();
  let noOfDays = 6;
  let startDate = moment(match.params.selectedvalue);
  let endDate = moment(startDate).add(noOfDays, "days");

  console.log("End date XXXX", endDate._d);

  useEffect(() => {
    setLoading(true);
    fetchTimeslots().then((res) => setTimeslots(res.data));
    fetchBlockedTimeslots(match.params.vendor).then((res) => {
      setBlockedTimeslots(res.data);
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchVendorCalendarDate(match.params.vendor, startDate, endDate._d).then(
      (res) => setCurrentslots(res.data)
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    getVendorCategory(match.params.vendor).then((res) => setVendata(res.data));
  }, []);

  console.log(timeslots);
  console.log(blockedTimeslots, "asajdbkdnk");
  console.log(vendata);

  const fetchDates = () => {
    for (let i = 0; i < noOfDays; i++) {
      days.push(moment(startDate).add(i, "days").format("DD/MM/YYYY"));
    }
  };

  {
    console.log("VENDOR FROM SELECT VENDOR", match.params);
  }
  {
    console.log("Vendor NNNN", dayval.dayval);
  }

  const newdate = moment(dayval.dayval, "DD-MM-YYYY");
  const handleSubmit = (e, timeslot, index, day) => {
    e.preventDefault();
    {
      console.log(
        "VALUES FROM SLOT",
        e,
        index,
        timeslot,
        day,
        match.params.vendor,
        match.params.selectedValue
      );
    }
    let cart = [];
    //check if the cart already has an item
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...vendata,
        bookingDate: moment(newdate).format("YYYY-MM-DD"),
        bookingSlots: timeslotsval.timeslotsval,
        count: timeslotsval.timeslotsval.length,
      });
      let unique = _.uniqWith(cart, _.isEqual);
      console.log("VALUE OF CART", unique);
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Added");

      //add to redux store
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        {fetchDates()}
        {console.log("CALDATE", days)}
        {days &&
          days.map((day) => (
            <div
              className="col col-md-2 d-flex justify-content-center"
              key={day}
            >
              <Card title={day}>
                {timeslots &&
                  timeslots.map((timeslot, index) => (
                    <RenderTimeslot
                      timeslotval={timeslot}
                      index={index}
                      key={index}
                      day={day}
                      currentslots={currentslots}
                      blockedSlots={blockedTimeslots}
                    />
                  ))}
              </Card>
            </div>
          ))}
        <div className="col col-md-6 mt-2 d-flex justify-content-end">
          <button className="btn btn-primary " type="submit">
            Add To Cart
          </button>
        </div>
        <div className="col col-md-6 mt-2 d-flex justify-content-start">
          <Link
            to={`/bookvendor/${match.params.vendor}`}
            type="button"
            className="btn btn-info"
          >
            Back to Calendar
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SelectTimeslot;
