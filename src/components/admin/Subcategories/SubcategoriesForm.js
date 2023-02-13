//form to display the jsx for create and edit subcategory form

import React, {useState, useEffect} from "react";
import { fetchCategories } from "../../../actions/category";

const SubcategoriesForm = ({handleSubmit, category, setCategory, name, setName, hide, setHide, type, setType}) => {

   const [categories, setCategories] = useState([]);

   useEffect(() => {
     getCategories();
   },[]);

   const getCategories= () => {
      fetchCategories().then( (cat) => setCategories(cat.data));
   }
  
  return (
    <form onSubmit= {handleSubmit}>  
      <div className="form-group row">
      <div className= "col col-md-12">
            <label  className="admin-class">Select a Category</label>         
                <select className="form-control"  
                   name="category"
                   onChange={(e) => setCategory(e.target.value)}
                 >
               <option>Select a category</option>             
               {categories.length > 0 && categories.map(catval => 
              (
                <option key={catval._id} 
                        value={catval._id}
                        selected={catval._id===category}
                        > 
                    {catval.name} </option> 
               ))}
             </select>
            </div>       
      <div className= "col col-md-12">
       <label className= " admin-class mt-2">Sub Category</label>
       <input 
              type = "text"
              name= "name"
              className= "form-control"
              placeholder= "Enter Sub Category" 
              onChange= {(e) => setName(e.target.value)}
              value= {name}                    
        />       
    </div>
    <div className= "col col-md-4">
    <p className= "admin-class ml-4 mt-2">Hide Sub Category</p>            
         <select
                 value= {hide === "Yes" ? "Yes":"No"}
                 name= "hide"
                 className= "form-control"
                 onChange= {(e) => setHide(e.target.value)}                          
          > 
          <option> Please Select</option>
          <option value="No">No</option>
          <option  value="Yes">Yes</option>
         </select> 
       </div>  
       <div className= "col col-md-4">
          <p className= "admin-class ml-4 mt-2">Sub Category Type</p>            
         <select
                value= {type === "Face to Face" ? "Face to Face":"Online"}
                 name= "type"
                 className= "form-control"
                 onChange= {(e) => setType(e.target.value)}
                          
          > 
          <option value="Face to Face">Face to Face</option>
          <option  value="Online">Online</option>
          <option  value="Both">Both</option>
          </select> 
       </div>        
    </div>
    <div className= "d-flex justify-content-center mt-2  ">
      <button type="submit" className = "btn btn-primary font-weight-bold " name="category">Save</button>  
      </div>  
    </form>
    );
  }

export default SubcategoriesForm;