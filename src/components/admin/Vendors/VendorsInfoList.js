import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import {fetchVendorsInfo} from "../../../actions/vendorInfo";
import AdminNav from "../../navigation/AdminNav";
import AdminMenu from "../AdminMenu";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import SearchBar from "../../utils/SearchBar";
import VendorInfoCard from "../../cards/VendorInfoCard";


const VendorsInfoList = () => {

  const [vendors,setVendors] = useState([]);
  const [loading,setLoading] = useState(false);
  const [keyword,setKeyword] = useState("");

  useEffect( () => {
      getVendors();
  },[]);

 const getVendors = () => {
  setLoading(true);
  fetchVendorsInfo().then( (res) => setVendors(res.data));
  setLoading(false);
 }

 const addRoute= () => {
  return("/vendor/vendorinfocreate");
 }

 const searchValue= (keyword) => (res) => res.name.toLowerCase().includes(keyword);

 const renderList = () => {

  return (
     vendors && vendors.filter(searchValue(keyword)).map( (vendor) => {
      return(
      <div className= "row"  key= {vendor._id}> 
       <VendorInfoCard  vendor= {vendor}                                
     />
    </div>        
      
      )
     })
  )
 }

  return (
   <div className= "row">
    <div className= "col-col-md-2">
       <AdminNav />
    </div>

    <div className= "col col-md-9">
      <AdminMenu 
         addRoute= {addRoute()}     
      />

     { loading ? <h2>Loading....</h2>
               : <h2 className= "font-weight-bold mb-2">List of Vendors</h2>
     }
     <SearchBar
          keyword= {keyword}
          setKeyword = {setKeyword}
     />
    
     <form>
       {renderList()}
     </form>
   
   </div>
   </div>   
    
  )
}

export default VendorsInfoList;