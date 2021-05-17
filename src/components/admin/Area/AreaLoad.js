import React, {useState} from "react";
import {useSelector} from "react-redux";
import {addArea} from "../../../actions/area";

const AreaLoad = () => {

  const {user} = useSelector( state => ({...state}));
  const [areas, setAreas] = useState([]);
  const [loading,setLoading] = useState(false);

  const submitAreas= (e) => {
      e.preventDefault();
      addArea(user.token)
      .then (res => {
        setLoading(true);
        setAreas(res.data); 
        setLoading(false);
      }     
      )}


  return (
   <div  className= "row">
     <div className= "col col-md-12 d-flex justify-content-center mb-5">
           <button type="submit" 
                   className= "btn btn-primary  mt-5"
                   onClick= {submitAreas}
           > { loading ? <h5>Loading Areas....</h5>
                       :<h5 className="font-weight-bold">UPLOAD AREAS</h5>
            }
           </button>
     </div>

   </div>
  )

}

export default AreaLoad;