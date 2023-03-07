import React, {useState, useEffect} from "react";
import AdminNav from "../../navigation/AdminNav";
import {getVendorCatSlug} from "../../../actions/vendor";
import AdminVendorCard from "../../cards/AdminVendorCard";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";

const VendorAdminCatList = ({match}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect( () => {
     loadVendorCategories();     
  },[]);

  const loadVendorCategories= () => {
    setLoading(true);
    getVendorCatSlug(match.params.slug)
    .then ( res => {
        setCategories(res.data);
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
               < AdminNav />   
           </div>  
           <div className= "col col-md-10">
            { loading ? <h4>Loading....</h4>
                      :  <h4 className= "font-weight-bold"> Vendor Categories </h4>
            }
           {/* {JSON.stringify(categories[0].vendorInfoId.name)} */}
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


export default VendorAdminCatList;