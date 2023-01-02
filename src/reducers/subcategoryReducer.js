import _ from "lodash";
import {
    CREATE_SUBCATEGORY,
    FETCH_SUBCATEGORIES,
    FETCH_SUBCATEGORIES_NAME,
    FETCH_SUBCATEGORIES_CATEGORIES,
    EDIT_SUBCATEGORY,
    DELETE_SUBCATEGORY
} from "../actions/types";

 const subcategoryReducer =(state = [], action) => {
    console.log("Action values from reducer 1:",action.type);
     switch (action.type) {
         case CREATE_SUBCATEGORY:
             console.log("Action values from reducer 2:",state);
             return {...state, [action.payload.id] : action.payload};
         case FETCH_SUBCATEGORIES:
             return {...state, ..._.mapKeys(action.payload, '_id')};
         case FETCH_SUBCATEGORIES_NAME: 
             return {...state, subcategoryName:action.payload} ;         
         case EDIT_SUBCATEGORY :          
            return {...state, [action.payload.id] : action.payload};
         case DELETE_SUBCATEGORY:
             return _.omit( state, action.payload);
         default:
              return state;
     }
}
export default subcategoryReducer;