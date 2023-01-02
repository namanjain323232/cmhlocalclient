import _ from "lodash";

let initialState= {
    timeslotsval: []
};

const timeslotReducer = ( state= initialState, action) => {
   switch(action.type) {
    case "SELECTED_TIMESLOT":
         let temp= state.timeslotsval;

    
         let unique=_.uniqWith(temp,_.isEqual); 
         let index = unique.findIndex(x => x.tstimeslot[0]._id === action.payload.tstimeslot[0]._id);
         unique.push(action.payload);
         let a= unique.filter(timeslot => timeslot.tsday == action.payload.tsday) 
     if(index > -1){
          var uniquevar=_.uniqWith(a,_.isEqual); 
          uniquevar.splice(index,1)
     }
              return {
              ...state,
              timeslotsval: uniquevar?.length || index > -1 ? uniquevar : a          
         }   
    default:
        return state;
   }
}
export default timeslotReducer;



