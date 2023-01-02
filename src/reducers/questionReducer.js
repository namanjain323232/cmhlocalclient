import _ from "lodash";
import { CREATE_QUESTION,
         FETCH_QUESTIONS,
         FETCH_QUESTIONS_NAME,
         EDIT_QUESTION,
         DELETE_QUESTION } from "../actions/types";
import categoryReducer from "./categoryReducer";

 const questionReducer= (state= [], action) => {
    console.log("Action values from question reducer :",action);
   switch (action.type) {
    case CREATE_QUESTION :
         return { ...state, [action.payload.id]  : action.payload};
    case FETCH_QUESTIONS :
         return {...state, ..._.mapKeys(action.payload, '_id' )};
    case FETCH_QUESTIONS_NAME :
            return {...state, questionName: action.payload} ;
    case EDIT_QUESTION :       
        return {...state, [action.payload.id] : action.payload};
    case DELETE_QUESTION :
        return _.omit( state, action.payload);  
    default:
        return state;
    }
}

export default questionReducer;