import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import VendorNav from "../../navigation/VendorNav";
import {fetchCategories, fetchCategorySubs} from "../../../actions/category";
import {getVendorCategory, updateVendor} from "../../../actions/vendor";
import VendorUpdateForm from "./VendorUpdateForm";
import FileUpload from "../../utils/FileUpload";

const VendorEdit = ({match,history}) => {

   const {user} = useSelector( (state) => ({...state}));
   const [loading,setLoading] = useState(false);
   const [categories, setCategories]= useState([]);
   const [subOptions, setSubOptions] = useState([]);
   const [arrOfSubIds, setArrOfSubIds]= useState([]);
   const [selectedCategory, setSelectedCategory]= useState("");

   const initialState= {  
    userId: user._id, 
    vendorInfoId: "" ,
    description: "",   
    category: "",
    subcategories: [],
    subcategory: "",
    price: "",
    pricetypes: ["Hourly", "Job", "Daily"],
    pricetype: "",
    images: [],
 }
  
  const [values, setValues] = useState(initialState);
  console.log("values before set",values);

   useEffect( () => {
     loadVendorCategory();
     loadCategories();
   }, []);

   const loadVendorCategory= () => {
        setLoading(true);
        getVendorCategory(match.params.id)
        .then ( (cat) => {
            setValues({...values, ...cat.data});
            fetchCategorySubs(cat.data.category._id)
              .then ( res => setSubOptions(res.data));
             let arr= [];
             cat.data.subcategories.map( (s) => {
                 arr.push(s._id)
             });
             console.log("ARR", arr);
             setArrOfSubIds((prev) => arr); 
        })
        .catch ( (err) => {
            console.log(err);
            toast.error(err.response);
        })
   }

   const loadCategories= () => {
       fetchCategories().then ( (res) => setCategories( res.data));
   }   

   const handleChange= (e) => {  
      setValues({ ...values, [e.target.name] : e.target.value});     
    // console.log(("Values from handlechange"),values);
   }

  const handleCategoryChange= (e) => {
    e.preventDefault();   
    setValues({ ...values,subcategories: []});
    setSelectedCategory(e.target.value);
    fetchCategorySubs(e.target.value)
    .then ( (res) => {      
      setSubOptions(res.data)
    })
    .catch ( (err) => {
       console.log(err);
    })
    //if the user clicks on the original category, fetch the previously selected subcats
    if( values.category._id === e.target.value) {
        loadVendorCategory();
    }
    setArrOfSubIds([]);    
  }

   const handleSubmit= (e) => {
       e.preventDefault();
       setLoading(true);
       values.subcategories= arrOfSubIds;
       values.category= selectedCategory ? selectedCategory : values.category;
       updateVendor( match.params.id, values, user.token)
       .then ( (res) => {
         setLoading(false);
         toast.success("Vendor categories updated successfully !!!!");
         history.push(`/vendor/vendorcatlistuser/${match.params.id}`);
       })
       .catch ( (err) => {
         setLoading(false);
         console.log(err);
         toast.error(err.response.data.err);
       })
   }

    return (
        <div className= "row">
          <div className= "col col-md-2">
            <VendorNav />
          </div>
          <div className= "col col-md-10 ">   
          <section className= "vendor-center">      
            <h2 className= "font-weight-bold mb-2">Change Categories </h2>
            {/* {JSON.stringify(values)} */}

            <div className= "p3 ml-2">
                  <FileUpload
                     values= {values}
                     setValues= {setValues}
                     setLoading= {setLoading}
                   />

               </div>  
            <VendorUpdateForm 
                handleSubmit= {handleSubmit}
                handleChange= {handleChange}
                setvalues= {setValues}
                values= {values}
                user= {user}
                categories= {categories}
                subOptions= {subOptions}
                arrOfSubIds= {arrOfSubIds}
                setArrOfSubIds= {setArrOfSubIds}
                handleCategoryChange= {handleCategoryChange}
                selectedCategory= {selectedCategory}
            />
            </section>
          </div>
        </div>
    )
}

export default VendorEdit;