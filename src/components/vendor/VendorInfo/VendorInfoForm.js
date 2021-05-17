//changes for vendorinfo form
import React, {useState,useEffect} from "react";
import PostcodeSearch from "../../utils/PostcodeSearch";
import {fetchCities, fetchCounties} from "../../../actions/area";

const VendorForm = ( {handleSubmit, 
                     handleChange,                     
                     values,
                     setValues,
                     email,                    
                     user,                                       
                     name, 
                     postcode,
                     houseNo,
                     addressLine1,
                     addressLine2, 
                     city,
                     county,
                     country,
                     vcounty,
                     setVcounty,
                    website
                    }) =>  {

const [cities,setCities] = useState([]);
const [counties,setCounties] = useState([]);
const [vcity,setVcity] = useState("");


useEffect( () => {
  fetchCities()
  .then ( res => {
    setCities(res.data)
    return res.data;
  } );   
},[]);


const handleCityChange= (e) => {
  e.preventDefault();
  setVcity(e.target.value);
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
              <label className= "admin-class">Your email</label>
              <input
                  type= "text"
                  disabled= "disabled"
                  name= "email"
                  className= "form-control"
                  value= {email}                 
                 />
                <label className= "admin-class">Name</label>
                <input
                  type= "text"
                  name= "name"
                  className= "form-control"
                  value= {name}
                  onChange= {handleChange}
                  autoFocus
                 />
                                
                 <label className= "admin-class">Postcode</label>
                 {/* <PostcodeSearch  
                   className="form-control"
                   name="postcode"
                   value= {postcode}
                   onChange= {() => handlePostcodeChange}
                /> */}

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
                <select className="form-control"  
                   name="city"
                   onChange= {handleCityChange}                 
                 >
               <option>Select a city</option>             
               {cities.length > 0 && cities.map(cityval => 
              {
                 return (<option key={cityval} 
                        value={cityval}
                        selected={cityval===city}
                        > 
                    {cityval} </option> 
               )})}	 
	           </select>
              <label className= "admin-class">County</label>
               <select className="form-control"  
                   name="county"
                   onChange= {e => setVcounty(e.target.value)} >
               <option>Select the county</option>             
               {counties.length > 0 && counties.map(countyval => 
              (
                // {console.log("COUNTY",countyval.county,county)}
                <option key={countyval.county} 
                        value={countyval.county}
                        selected={countyval.county===vcounty}
                        > 
                    {countyval.county} </option> 
               ))}                  
               </select> 

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



 export default VendorForm;