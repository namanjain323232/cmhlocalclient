import axios from "axios";
import history from "../history";

const ROOT_URL = "http://localhost:5000";

//action creator for Timeslot master
export const addTimeslot = async (values, authtoken) => {
  const slot = await axios.post(`${ROOT_URL}/api/timeslot`, values, {
    headers: { authtoken },
  });
  history.push("/admin/timeslot/listslots");
};

export const fetchTimeslots = async () => {
  return await axios.get(`${ROOT_URL}/api/timeslots`);
};

export const fetchBlockedTimeslots = async (vendorid) => {
  return await axios.get(`${ROOT_URL}/api/blockedtimeslots/${vendorid}`);
};

export const fetchTimeslot = async (_id) => {
  return await axios.get(`${ROOT_URL}/api/timeslot/${_id}`);
};

export const editTimeslot = async (_id, values, authtoken) => {
  const res = await axios.put(`${ROOT_URL}/api/timeslot/${_id}`, values, {
    headers: { authtoken },
  });
  history.push("/admin/timeslot/listslots");
};

export const deleteTimeslot = async (_id, authtoken) => {
  const res = await axios.delete(`${ROOT_URL}/api/timeslot/${_id}`, {
    headers: { authtoken },
  });
  history.push("/admin/timeslot/listslots");
};
