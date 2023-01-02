//form to display the jsx for create and edit subcategory form

import React, {useState, useEffect} from "react";
import { fetchCategories } from "../../../actions/category";

const SubcategoriesForm = ({handleSubmit, category, setCategory, name, setName}) => {

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
       <label className= " admin-class mt-2">Name</label>
       <input 
              type = "text"
              name= "name"
              className= "form-control"
              placeholder= "Enter Sub Category" 
              onChange= {(e) => setName(e.target.value)}
              value= {name}                    
        />       
    </div>
    </div>
    <div className= "d-flex justify-content-center mt-2  ">
      <button type="submit" className = "btn btn-primary font-weight-bold " name="category">Save</button>  
      </div>  
    </form>
    );
  }

export default SubcategoriesForm;