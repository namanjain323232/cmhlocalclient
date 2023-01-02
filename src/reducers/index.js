import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import subcategoryReducer from "./subcategoryReducer";
import utilReducer from "./utilReducer";
import questionReducer from "./questionReducer";
import subcatQuestionReducer from "./subcatQuestionReducer";
import alertReducer from "./alertReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import { serachReducer } from "./searchReducer";
import drawerReducer from "./drawerReducer";
import dayReducer from "./dayReducer";
import timeslotReducer from "./timeslotReducer";

export default combineReducers(
               { alert: alertReducer,
                auth: authReducer, 
                user: userReducer,  
                cart: cartReducer, 
                drawer: drawerReducer,
                search: serachReducer,           
                form: formReducer,
                categories: categoryReducer,
                subcategories: subcategoryReducer,
                util: utilReducer,
                questions: questionReducer,
                subquestion: subcatQuestionReducer,
                dayval: dayReducer,
                timeslotsval: timeslotReducer
               });
