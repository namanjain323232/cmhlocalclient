import _ from "lodash";
import { FETCH_CATEGORIES_NAME, FETCH_SUBCATEGORIES_NAME, FETCH_QUESTIONS_NAME } from "../actions/types";

const utilReducer = (state = {}, action ) => {
    console.log("Action:",action.type);

    switch (action.type)
   {
    //  case FETCH_CATEGORIES_NAME :
    //     console.log("State value from util reducer:",action.payload);
    //     // return { ...state, [action.payload.category] : action.payload};
    //     return {...state, categoryName:action.payload};   
     case FETCH_SUBCATEGORIES_NAME: 
       return {...state, subcategoryName:action.payload} ;
     case FETCH_QUESTIONS_NAME :
         return {...state, questionName: action.payload} ;
    
    default: 
        return state;
    }  
}

export default utilReducer;