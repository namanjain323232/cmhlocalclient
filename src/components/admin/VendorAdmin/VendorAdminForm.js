//changes for vendoradmin form
import React, {useState,useEffect} from "react";
import PostcodeSearch from "../../utils/PostcodeSearch";
import {fetchCities, fetchCounties} from "../../../actions/area";

const VendorAdminForm = ( {handleSubmit, 
                     handleChange,                     
                     email,                    
                     name, 
                     postcode,
                     houseNo,
                     addressLine1,
                     addressLine2, 
                     city,
                     county,
                     country,
                     handleCounty,
                     handleCity,
                    website
                    }) =>  {

const [cities,setCities] = useState([]);
const [counties,setCounties] = useState([]);

useEffect( () => {
  fetchCities()
  .then ( res => {
    setCities(res.data)
    return res.data;
  } );       
},[]);

useEffect(() => {
  if(city){
      fetchCounties(city)
      .then ( res => {
        setCounties(res.data)
        return res.data;
      })
      .catch ( err => console.log(err));
  }
}, [city])


const handleCityChange= (e) => {
  e.preventDefault();
  handleCity(e);
  fetchCounties(e.target.value)
  .then ( res => {
    setCounties(res.data)
    return res.data;
  })
  .catch ( err => console.log(err));
}

console.log("Counties",counties);
const renderFields= () => {

      const handlePostcodeChange= (props) => {
          console.log("Props from vendor autocomplete", props);
      }
        return (
            <form onSubmit= {handleSubmit}>
            <section >
              <div className= "form-group">
              <label className= "admin-class">Email</label>
              <input
                  type= "text"
                  name= "email"
                  className= "form-control"
                  value= {email}  
                  onChange= {handleChange}
                  autoFocus               
                 />
                <label className= "admin-class">Name</label>
                <input
                  type= "text"
                  name= "name"
                  className= "form-control"
                  value= {name}
                  onChange= {handleChange}                
                 />
                                
                 <label className= "admin-class">Postcode</label>
                 <input
                  type= "text"
                  name= "postcode"
                  className= "form-control"
                  value= {postcode}
                  onChange= {handleChange}
                 />
                <label className= "admin-class">House No</label>
                <input
                  type= "text"
                  name= "houseNo"
                  className= "form-control"
                  value= {houseNo}
                  onChange= {handleChange}
                 />
                <label className= "admin-class">Address Line 1</label>
                <input
                  type= "text"
                  name= "addressLine1"
                  className= "form-control"
                  value= {addressLine1}
                  onChange= {handleChange}
                 />
                <label className= "admin-class">Address Line 2</label>
                <input
                  type= "text"
                  name= "addressLine2"
                  className= "form-control"
                  value= {addressLine2}
                  onChange= {handleChange}
                 />
                <label className= "admin-class">City</label>
                <input
                   type= "text"
                   name="city"
                   className= "form-control"
                   value= {city}
                   onChange= {handleChange}
                  />
              <label className= "admin-class">County</label>
               <input 
                  type= "text"
                  name="county"
                  className="form-control"
                  value= {county}
                  onChange= {handleChange}
               />

                 <label className= "admin-class">Country</label>
                 <input
                  type= "text"
                  name= "country"
                  className= "form-control"
                  value= {country}
                  onChange= {handleChange}
                 />
                
                <label className= "admin-class">Website</label>
                 <input
                  type= "text"
                  name= "website"
                  className= "form-control"
                  value= {website}
                  onChange= {handleChange}
                 />
                
               </div>
               <div className= "d-flex justify-content-center mt-1 mb-2 ">
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



 export default VendorAdminForm;