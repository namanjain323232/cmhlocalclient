import _ from "lodash";
import {
    CREATE_SUBCAT_QUESTION,
    FETCH_SUBCAT_QUESTIONS,
    EDIT_SUBCAT_QUESTION,
    DELETE_SUBCAT_QUESTION
} from "../actions/types";

 const subcatQuestionReducer= (state = [], action) => {
     switch (action.type) {
         case CREATE_SUBCAT_QUESTION:           
             return {...state, [action.payload.id] : action.payload};
         case FETCH_SUBCAT_QUESTIONS:
            console.log("Action values from reducer 3:",action);
             return {...state, ..._.mapKeys(action.payload, '_id')};
         case EDIT_SUBCAT_QUESTION :          
            return {...state, [action.payload.id] : action.payload};
         case DELETE_SUBCAT_QUESTION:
             return _.omit( state, action.payload);
         default:
              return state;
     }
}
export default subcatQuestionReducer;