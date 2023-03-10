import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import _ from "lodash";

const RenderTimeslot = ({
  timeslotval,
  index,
  day,
  currentslots,
  blockedSlots,
}) => {
  const { dayval } = useSelector((state) => ({ ...state }));
  const { timeslotsval } = useSelector((state) => ({ ...state }));
  const [caldata, setCaldata] = useState([]);
  const [color, setColor] = useState(false);
  const [dummy, setDummy] = useState(false);
  const [ok, setOk] = useState(false);

  const dispatch = useDispatch();
  const timeslots = [];

  //  {console.log("Current slots ZZZ", currentslots,timeslotval,index,day)}

  const handleClick = (e, timeslotval, index, day) => {
    e.preventDefault();
    setColor(!color);
    localStorage.setItem("dayval", day);
    if (typeof window !== "undefined") {
      if (localStorage.getItem("timeslots")) {
        timeslots = JSON.parse(localStorage.getItem("timeslots"));
      }
      timeslots.push({ ...timeslotval, count: 1 });
    }
    let unique = _.uniqWith(timeslots, _.isEqual);
    //add to redux store
    dispatch({
      type: "SELECTED_DAY",
      payload: {
        dayval: day,
      },
    });

    dispatch({
      type: "SELECTED_TIMESLOT",
      payload: {
        tsday: day,
        tstimeslot: unique,
      },
    });
  };
  useEffect(() => {
    blockedSlots.map((slots) => {
      // console.log(slots.timeslotsSE);
      slots.timeslotsSE.map((slot) => {
        if (
          slot.start == timeslotval.startSlot &&
          moment(slots.bookingDate).format("DD/MM/YYYY") == day
        ) {
          setDummy(true);
        }
      });
    });
  }, [ok]);
  useEffect(() => {
    // console.log(timeslotval);

    setTimeout(() => {
      setOk(true);
    }, 200);
    // console.log(kuchbhi);
  }, []);

  const disableButtons = (timeslots, key) => {
    let newslots = new Set();
    return timeslots.filter((item) => {
      let k = key(item);
      return newslots.has(k) ? false : newslots.add(k);
    });
  };

  return (
    <div>
      {/* {console.log("DAY",day)} 
              {console.log(currentslots.map(slots => moment(slots?.availability[0].start).format('DD/MM/YYYY') == moment(day) 
                                            &&  slots?.availability[0].timeslots?.some(slot => {return(slot._id == timeslotval._id)})))}  */}

      <button
        key={timeslotval._id}
        // disabled={currentslots
        //   .map(
        //     (slots) =>
        //       moment(slots?.availability[0].start).format("DD/MM/YYYY") ==
        //         day &&
        //       slots?.availability[0].timeslots?.some((slot) => {
        //         return slot._id == timeslotval._id;
        //       })
        //   )
        //   .includes(true)}
        disabled={
          dummy
          // slots.timeslotsSE.map((slot) => {
          // return (
          //   moment(slots.bookingDate).format("DD/MM/YYYY") == day &&
          //   slot.start == timeslotval.startSlot
          // );
          // })
        }
        className={
          dummy
            ? "btn btn-danger mb-1 btn-sm font-weight-bold"
            : currentslots
                .map(
                  (slots) =>
                    moment(slots?.availability[0].start).format("DD/MM/YYYY") ==
                      day &&
                    slots?.availability[0].timeslots?.some((slot) => {
                      return slot._id == timeslotval._id;
                    })
                )
                .includes(true)
            ? "btn btn-secondary mb-1 btn-sm font-weight-bold"
            : day == dayval.dayval &&
              timeslotsval.timeslotsval.some((slot) => {
                return slot.tstimeslot[0]._id == timeslotval._id;
              })
            ? "btn btn-danger mb-1 btn-sm font-weight-bold"
            : "btn btn-primary mb-1 btn-sm font-weight-bold"
        }
        value={timeslotval._id}
        onClick={(e) => handleClick(e, timeslotval, index, day)}
      >
        {timeslotval.startSlot}-{timeslotval.endSlot}
      </button>
    </div>
  );
};

export default RenderTimeslot;
