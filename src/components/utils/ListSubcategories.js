import React, {useState, useEffect} from "react";
import {fetchSubcategories} from "../../actions/subcategory";
import {Link} from "react-router-dom";

const ListSubcategories = (props) => 
{  
 const [subcat, setSubcat] = useState([]);

 useEffect( () => {    
     fetchSubcategories().then ( (res) => setSubcat(res.data));
 },[]);


   const renderSubcategories= () => {        
    return(
      subcat.map( subcategoryval => {
          if(subcategoryval.category._id) {
             if (subcategoryval.category._id === props.categoryValue) {
             return(
              <div  key= {subcategoryval._id} className= "mb-1">
                 <Link to= {`/vendorcat/${subcategoryval.slug}`} >{subcategoryval.name} </Link>
               </div>
             ) }
           }
           } )
         )
     }
    
    return (
      <div >
         {renderSubcategories()}             
      </div>
    );

}
export default ListSubcategories;

