import _ from 'lodash';
import {
       CREATE_CATEGORY,
       FETCH_CATEGORIES,
       FETCH_CATEGORIES_NAME,
       EDIT_CATEGORY,
       DELETE_CATEGORY } from "../actions/types";

const categoryReducer= (state = [], action) => {
    switch (action.type) {
        case FETCH_CATEGORIES:            
           return {...state, ..._.mapKeys(action.payload, '_id')} ;          
        case FETCH_CATEGORIES_NAME :
            return {...state, categoryName:action.payload};  
        case EDIT_CATEGORY:
            return {...state, [action.payload.id] : action.payload} ;        
         case CREATE_CATEGORY:
           return {...state, [action.payload.id] : action.payload} ;        
         case DELETE_CATEGORY:
             const categoryId = action.data;
             return state.filter(category => category.id !== categoryId);     
        default:
            return state;
    }
}

export default categoryReducer;