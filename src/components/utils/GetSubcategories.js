import React, {useState, useEffect} from "react";
import {fetchSubcategories} from "../../actions/subcategory";
import {Select} from "antd";
const {Option} = Select;

const GetSubcategories= () => {

    const [subcategories, setSubcategories] = useState([]);
    const [subcategory,setSubcategory]= useState("");

    useEffect(() => {
        fetchSubcategories().then(res => setSubcategories(res.data));
    },[]);

 return(                  
    <select 
         name= "subcategory"   
         className= "form-control mt-3 mb-3 ml-4 font-weight-bold h6"
         style={{height:"50px"}}         
         onChange= { subcategory => setSubcategory(subcategory)}
     > 
    <option value="">Select a Sub Category</option>                  
   { subcategories && subcategories.map( (s) => {
   return (  <option key= {s._id} value= {s._id}>
          {s.name}
     </option> ) }
   )}
   </select> 

 )    

}

export default GetSubcategories;