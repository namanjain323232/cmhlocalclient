import axios from "axios";
import history from "../history";

const ROOT_URL = 'http://localhost:5000';

export const fetchVendorCalendarCurrent = async (userid, start) => {
  const res = await axios.get(`${ROOT_URL}/api/vendorcalendar/existing/${userid}/${start}`);
  console.log(`Existing res ZZZZ`, res);
  return res;
}

export const addVendorCalendar = async (userid, formvalues, authtoken) => {
  console.log(`Before response`, formvalues);
  const res = await axios.post(`${ROOT_URL}/api/vendorcalendar/${userid}`, formvalues,
    { headers: { authtoken } });
  console.log(`RES from Vendor Calendar`, res);
  // history.push(`/vendor/dashboard`);   
};

export const fetchVendorCalendar = async (userid) => {
  const res = await axios.get(`${ROOT_URL}/api/vendorcalendar/${userid}`);
  console.log(`Vendor Calendar values`, res);
  return res;
};

export const fetchVendorCalendarVend = async (vendorid) => {
  const res = await axios.get(`${ROOT_URL}/api/vendorcalendar/vendor/${vendorid}`);
  console.log(`Vendor Calendar by vendor values`, res);
  return res;
};

export const fetchVendorCalendarDate = async (vendorid, start, end) => {
  const res = await axios.get(`${ROOT_URL}/api/vendorcalendar/vendor/date/${vendorid}/${start}/${end}`);
  console.log(`Vendor calendar by date range`, res);
  return res;
}


export const readVendorCalendar = async (id) => {
  const res = await axios.get(`${ROOT_URL}/api/vendorcalendar/single/${id}`);
  console.log(`Vendor Calendar values`, res);
  return res;
};


export const editVendorCalendar = async (userid, startdate, formValues, authtoken) => {
  const res = await axios.put(`${ROOT_URL}/api/vendorcalendar/${userid}/${startdate}`, formValues,
    { headers: { authtoken } });
  console.log(`Response from edit`, res);
  // history.push(`/admin/categories/categorieslist`); 
};

export const addBulkBooking = async (userid, formvalues, authtoken) => {
  const res = await axios.post(`${ROOT_URL}/api/vendorcalendar/bulkbook/${userid}`, formvalues,
    { headers: { authtoken } });
  console.log(`Response from bulk booking`, res);
  return res;
}

export const addBulkAvail = async (userid, formvalues, authtoken) => {
  const res = await axios.post(`${ROOT_URL}/api/vendorcalendar/bulkavail/${userid}`, formvalues,
    { headers: { authtoken } });
  console.log(`Response from bulk avail`, res);
  return res;
}

export const upcomingBookings =  async (vendorid) =>  {
  const res= await axios.get(`http://localhost:5000/api/vendorcalendar/booking/${vendorid}`);  
   console.log("Vendorbookings",res) ;  
   return res;
 };