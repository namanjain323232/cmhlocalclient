import React, {useState, useEffect} from "react";
import { toast } from "react-toastify";
import {useSelector} from "react-redux";
import VendorNav from "../../navigation/VendorNav";
import {addVendorInfo} from "../../../actions/vendorInfo";
import VendorInfoForm from "../VendorInfo/VendorInfoForm";

const VendorInfoCreate = () => {

 const {user} = useSelector( state => ({...state})); 
 
 const initialState= {  
    userId: user._id,
    email: user.email,    
    postcode: "",
    name: "",
    houseNo: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    county: "",
    country: "United Kingdom",
    website: ""
 }
 const [values, setValues] = useState(initialState); 
 const [loading,setLoading] = useState(false);

   
 const {
  email, 
  userId,
  postcode,
  name,
  houseNo,
  addressLine1,
  addressLine2,
  city,
  county,  
  country,
  website
}  = values;

  const handleChange= (e) => {  
        setValues({ ...values, [e.target.name] : e.target.value});
        console.log(e.target.name, ".....", e.target.value);
    }
      
  const handleSubmit = (e) => {       
        e.preventDefault();
        setLoading(true);
        setValues({ ...values,  userId: user._id, email:user.email});        
        addVendorInfo(values, user.token)
        .then ( (res) => {
            setLoading(false);
            window.alert(`Vendor Information is created successfully for ${user.email}` );
            window.location.reload();
        })
        .catch ( (err) => {
           console.log(err);
           setLoading(false);
           toast.error(err.response);            
        });        
   }  

    return (
        <div className= "row">
           <div className= "col col-md-2">
              <VendorNav />
           </div>
           <div className= "col col-md-10">
                           
              <section className= "vendor-center">  

              { loading ? <h2>Loading....</h2> 
               : <h2 className="card-header font-weight-bold" > Vendor Information </h2>  }    
 
             <div className = "card  mb-2" >
             <div className= " card-body mb-1 " >   
              <VendorInfoForm 
                 handleSubmit= {handleSubmit}
                 handleChange= {handleChange}
                 email= {user.email}
                 userId={user._Id}
                 user={user}                              
                 name= {name}
                 postcode= {postcode}
                 houseNo = {houseNo}
                 addressLine1= {addressLine1}
                 addressLine2= {addressLine2}
                 city= {city}
                 county= {county}
                 country= {country} 
                 website= {website}                
                 values= {values}
                 setValues= {setValues}
              /> 
             </div>
             </div>
             </section>
           </div>
        </div>
    )
}

export default VendorInfoCreate;