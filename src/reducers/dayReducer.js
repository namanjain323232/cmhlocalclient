let initialState= "";
 
const dayReducer = ( state= initialState, action) => {
   switch(action.type) {
    case "SELECTED_DAY" :
        return action.payload;       
     default:
        return state;
   }
}
export default dayReducer;