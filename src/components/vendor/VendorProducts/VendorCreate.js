import React, {useState, useEffect} from "react";
import { toast } from "react-toastify";
import {useSelector} from "react-redux";
import VendorNav from "../../navigation/VendorNav";
import {addVendor} from "../../../actions/vendor";
import VendorForm from "./VendorForm";
import {fetchCategories, fetchCategorySubs} from "../../../actions/category";
import {fetchVendorInfo} from "../../../actions/vendorInfo";
import FileUpload from "../../utils/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const VendorCreate = () => {

 const {user} = useSelector( state => ({...state}));   

 const initialState= {  
   userId: user._id, 
   vendorInfoId: "" ,
   description: "",
   categories: [],
   category: "",
   subcategories: [],
   subcategory: "",
   price: "",
   pricetypes: ["Hourly", "Job", "Daily"],
   pricetype: "Hourly",
   images: []
}
 const [values, setValues] = useState(initialState); 
 const [loading,setLoading] = useState(false);
 const [subOptions, setSubOptions] = useState([]);
 const [ showSubs, setShowSubs] = useState(false);
 const [vendor, setvendor] = useState("");


 useEffect( () => {
    getCategories();
    getVendorInfo();
 }, []);

 const getCategories= () => {
    fetchCategories().then( (res) => setValues({ ...values, subcategories:[], categories: res.data}));
 }

 const getVendorInfo = () => {
    setLoading(true);
    fetchVendorInfo(user.email)
       .then ( (v) =>  {
          setLoading(false);        
          setvendor(v.data);
       })      
       .catch ( (err) => {
          setLoading(false);
          console.log(err);
          toast.error(`Vendor info not found for user: ${user.email}`);
       })
 }

  const handleChange= (e) => {  
        setValues({ ...values, [e.target.name] : e.target.value, vendorInfoId: vendor._id});     
        console.log(("Values from handlechange"),values);
    }

  const handleCategoryChange= (e) => {
    e.preventDefault();   
    setValues({ ...values,subcategories: [], category: e.target.value});
    fetchCategorySubs(e.target.value)
    .then ( (res) => {      
      setSubOptions(res.data)
    })
    .catch ( (err) => {
       console.log(err);
    })
    setShowSubs(true);
  }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Values before submit",values);
        setValues({ ...values,vendorInfoId: vendor._id,userId: user._id}); 
        setLoading(false);
        console.log("Values after set values vendor submit",values);
      
        addVendor(values, user.token)
        .then ( (res) => {
            setLoading(false);
            window.alert(`Vendor is created successfully !!!!` );
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
             { loading ? <LoadingOutlined  className= "text-danger h1"/>
                       : <h2 className= "card-header font-weight-bold">Vendor Categories Form</h2>  
             }
             
              <div className = "card " >
               <div className= " card-body mb-1 " > 

               <div className= "p3">
                  <FileUpload
                     values= {values}
                     setValues= {setValues}
                     setLoading= {setLoading}
                   />

               </div>  

              <VendorForm 
                 handleSubmit= {handleSubmit}
                 handleChange= {handleChange}
                 vendorInfoId={vendor._id}  
                 vendorName= {vendor.name}
                 userId={user._id}
                 values= {values}
                 setValues= {setValues}
                 handleCategoryChange= {handleCategoryChange}
                 subOptions= {subOptions}
                 showSubs= {showSubs}                 
              /> 
             </div>
             </div>
             </section>
           </div>

        </div>
    )
}


export default VendorCreate;