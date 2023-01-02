import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import VendorNav from "../../navigation/VendorNav";
import {getVendorCategoriesUser} from "../../../actions/vendor";
import AdminVendorCard from "../../cards/AdminVendorCard";
import {useSelector} from "react-redux";

const VendorListUser = () => {

  const {user} = useSelector( state => ({...state}));
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect( () => {
     loadVendorCategoriesUser();     
  },[]);

   const loadVendorCategoriesUser= () => {
    setLoading(true);
    getVendorCategoriesUser(user._id)
    .then ( res => {
        setCategories(res.data)
        setLoading(false);
    })
    .catch ( err => {
        setLoading(false);
        console.log(err);
    })
  }

        
   return(
    <div className= "container-fluid">
        <div className= "row ml-0 text-align-top">
           <div className= "col-md-2 mt-2 ">
               <VendorNav />   
           </div>  
           <div className= "col col-md-10">
           
           <li className= "nav-item col d-flex justify-content-center admin-class mb-2">
            <Link to= "/vendor/vendorcreate" className= "nav-link">Add New Categories</Link>
          </li>  
            { loading ? <h4>Loading....</h4>
                      :  <h4 className= "font-weight-bold"> Current Categories</h4>
            }
            <div className= "row pb-3">
            { categories.map( (cat) => {
             return (
              <div className= "col col-md-4"  key= {cat._id}>                              
               <AdminVendorCard  cat= {cat}                                
               />
               </div>
             )
            })
            } 
            </div>         
             
           </div>
        </div>
    </div>
   )
}


export default VendorListUser;
