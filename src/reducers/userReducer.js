import {
    LOGGED_IN_USER,
    LOGOUT
} from "../actions/types";

let userState;

if (window.localStorage.getItem("user")) {
    userState= JSON.parse(window.localStorage.getItem("user"));
    console.log("USER STATE from REDUCER",JSON.stringify(userState));
} else {
    userState=null;
}



const userReducer= (state = userState, action) => {
switch(action.type) {
    case LOGGED_IN_USER:
        return action.payload;
    case LOGOUT:
        return action.payload;
    default:
        return state;
}
}
export default userReducer;