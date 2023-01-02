import React from "react";
import { Select } from "antd";
const {Option} = Select;

const VendorUpdateForm = ( {handleSubmit, 
                            handleChange,                    
                            values,
                            setValues,
                            categories,
                            subOptions,
                            arrOfSubIds,
                            setArrOfSubIds,
                            handleCategoryChange,
                            selectedCategory                                     
                           }) =>  {

 const {   
   description,  
   subcategories,
   category, 
   price,
   pricetypes,
   pricetype,
   vendorInfoId  
}  = values;

 
    const renderFields= () => {
        return (
            <form onSubmit= {handleSubmit}>
            <section >
              <div className= "form-group ml-2">
                <label className= "admin-class">Vendor</label>
                <input
                  type= "text"
                  disabled= "disabled"
                  name= "vendorname"
                  className= "form-control"
                  value= {vendorInfoId.name}                 
                 />                  
                                 
                 <label className= "admin-class">Description</label>
                <textarea
                  name= "description"
                  rows="2"
                  className= "form-control"
                  value= {description}
                  onChange= {handleChange}
                 />  

                 <label className= "admin-class">Category</label>
                 <select
                   name= "category"
                   value= {selectedCategory ? selectedCategory : category._id}
                   className= "form-control"
                   onChange= { handleCategoryChange}
                 >
                  {/* <option>{ category ? category.name : "Select a category"}</option> */}
                  {categories.length > 0 && categories.map( (c) => (
                    <option key= {c._id} value= {c._id}> {c.name}</option>
                 ))
                 }
                 </select> 

                 <div>
                  <label className= "admin-class mt-1 mb-1">Subcategories</label>
                  <Select mode= "multiple"
                          style={{ width: '100%' }}
                          placeholder= "Select a Sub category"
                          className= "font-weight:800 subdropdown"
                          value= {arrOfSubIds}
                          onChange= { (value) => setArrOfSubIds( value) }
                  >
                     { subOptions.length && subOptions.map( (s) => (
                         <Option key= {s._id} value= {s._id}>
                            {s.name}
                         </Option>
                     ))}
                  </Select>                  
                 </div>
                                   
                 <label className= "admin-class">Price Type</label>``
                 <select
                   value= {pricetype}
                   name= "pricetype"
                   className= "form-control"
                   onChange= {handleChange}
                 >
                 
                  {pricetypes.map((c) => (
                  <option key={c} value={c}>
                  {c}
                 </option>
                 ))}         
                 </select>
                 <label className= "admin-class">Price</label>
                 <input
                  type= "number"
                  name= "price"
                  className= "form-control"
                  value= {price}
                  onChange= {handleChange}
                 />  
                                                   

               </div>
               <div className= "d-flex justify-content-center mt-1">
                  <button type="submit" className = "btn btn-primary font-weight-bold " name="category">Save</button>  
               </div> 
            </section>
            </form>
        ) 
    }            
    
   
        return(   
            <div>             
               {renderFields()}        
            </div>        
        )
    }



 export default VendorUpdateForm;
