import React, {useState, useEffect} from "react";
import {fetchAreas} from "../../../actions/area";
import AdminNav from "../../navigation/AdminNav";
import AreaLoad from "./AreaLoad";

const ListAreas = () => {

  const [areas, setAreas] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect( () => {
      setLoading(true);
      fetchAreas().then ( res => {         
          setAreas(res.data);
          setLoading(false);
      });
  },[]);

  const renderList= () => ( 
     areas && areas.map ( area => {
        return(
         <div className="row" key= {area._id}>
           <div className= "col col-md-3 mb-2 d-flex justify-content-center">
             {area.city}
           </div>
           <div className= "col col-md-3 mb-2 d-flex justify-content-center">
             {area.county}
           </div>
           <div className= "col col-md-3 mb-2 d-flex justify-content-center">
             {area.country}
           </div>
        </div>
       )
       }
       )
  ) 

  return (    
      
    <div className="row">      
    <div className= "col col-md-2">
        <AdminNav />
    </div>  
    <div className= "col col-md-9">
      <AreaLoad />
      { loading ? <h1>Loading areas...</h1> :<h1> List of Areas</h1> }
      <div className= "container-fluid category-center"> 
       <div className = " row">  
        <div className= "col col-md-3">
         <h6 className= "font-weight-bold mb-2" >City</h6>
        </div>
        <div className= "col col-md-3">
        <h6 className= "font-weight-bold mb-2"> County</h6>
        </div>
        <div className= "col col-md-3">
         <h6 className= "font-weight-bold mb-2"> Country</h6>
        </div>
      </div>
      <form>
      {renderList()}
      </form>   
      </div>
    </div>
      </div>
 
  )
}

export default ListAreas;