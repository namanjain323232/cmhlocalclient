import React, {useState, useEffect} from "react";
import { toast } from "react-toastify";
import {useSelector} from "react-redux";
import VendorNav from "../../navigation/VendorNav";
import {fetchVendorInfo,editVendorInfo} from "../../../actions/vendorInfo";
import VendorInfoForm from "./VendorInfoForm";


const VendorInfoEdit = ({match}) => {

 const {user} = useSelector( state => ({...state}));   
 const [values, setValues] = useState([]); 
 const [loading,setLoading] = useState(false);
 const [vcounty,setVcounty] = useState("");
 const email= match.params.email

 {console.log("MATCH",match)}
  useEffect( () => {
     getVendorInfo();
 },[]);

 const getVendorInfo= () => 
 {
    fetchVendorInfo(user.email)
      .then ( res => setValues(res.data))
      .catch ( (err)  => {
         console.log("No vendor info was found",err);         
      })
 } 

 

console.log("Authtoken:",user.token );

  const handleChange= (e) => {  
        setValues({ ...values, [e.target.name] : e.target.value});
        setValues({...values, county: vcounty });
        console.log(e.target.name, ".....", e.target.value);
    }

    console.log("values from vendor edit",values);
    const {
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


      
  const handleSubmit = (e) => {       
        e.preventDefault();
        setLoading(true);  
        console.log("Values before EDIT",values, values.county);           
        editVendorInfo(email,values, user.token)
        .then ( (res) => {
            setLoading(false);
            window.alert(`Vendor Information is changed successfully for ${user.email}` );
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
               : <h2 className="card-header font-weight-bold" > Edit Vendor Information </h2>  }    
 
             <div className = "card  mb-2" >
             <div className= " card-body mb-1 " >   
              <VendorInfoForm 
                 handleSubmit= {handleSubmit}
                 handleChange= {handleChange}
                 email= {user.email}                                            
                 name= {name}
                 postcode= {postcode}
                 houseNo = {houseNo}
                 addressLine1= {addressLine1}
                 addressLine2= {addressLine2}
                 city= {city}
                 vcounty= {vcounty}
                 setVcounty= {setVcounty}
                 country= {country}                 
                 website= {website}                
                 values= {values}
                 setValues= {setValues}
              /> 

              {console.log("Value of Vcounty",vcounty)};
                         
             </div>
             </div>
             </section>
           </div>
        </div>
    )
}

export default VendorInfoEdit;