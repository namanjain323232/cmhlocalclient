import React, {useState, useEffect} from "react";
import { Link} from "react-router-dom";
import AdminNav from "../../navigation/AdminNav";
import {fetchVendorsInfo} from "../../../actions/vendorInfo";
import {fetchSubcategories} from "../../../actions/subcategory";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import SearchBar from "../../utils/searchBar";
import AdminMenu from "../AdminMenu";

const  VendorAdminList = () =>
{

  const [vendors, setVendors] = useState([]);
  const [sub, setSub] = useState([]);
  const [loading,setLoading]= useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
     getVendors();    
  }, []);

  const getVendors = () => {
    setLoading(true);
    fetchVendorsInfo().then( (res) => setVendors(res.data));
    setLoading(false);
   }


 const addRoute= () => {
    return("/admin/subcategories/subcategoriescreate");
 }

 const searchValue= (keyword) => (res) => res.name.toLowerCase().includes(keyword);

 const renderList= () => 
 {    
    return (      
      vendors.filter(searchValue(keyword)).map( vendor => 
        {
           { if (vendor._id)  
              return (
                <div className= "row" key= {vendor._id}>                  
                 
                   <div className= "col col-md-2 text-align-right ">
                       {vendor.name}
                    </div>     
                    <div className= "col col-md-2 text-align-right ">
                       {vendor.email}
                    </div>  
                    <div className= "col col-md-4 text-align-right ">
                       {vendor.houseNo} {vendor.addressLine1}
                       {vendor.addressLine2}
                       {vendor.city}
                       {vendor.county}
                       {vendor.postcode}
                       {vendor.country}
                    </div>    
                   <div className= "col col-md-2 text-align-right ">
                       {vendor.website}
                   </div>            
            <div className= "col-md-2 mb-1">
              <Link to= {`/admin/subcategories/subcategoriesedit`} 
                            className= "btn btn-primary  mr-1 ">
                           <EditOutlined /></Link>
               <Link to= { `/admin/subcategories/subcategoriesdelete`}
                         className= "btn btn-danger mr-1">
                    <DeleteOutlined /></Link>   
            </div>   
         </div>   
                 ) }       
        })    
    )}


  return(
    <div className= "row">
      <div className= "col-md-2">
          <AdminNav />
      </div>

      <div className= "col-md-9" >
         <AdminMenu 
             addRoute = {addRoute()}
        />
      
       { (!sub) ? <h2>Loading.....</h2> 
                   :<h2  className= "card-header font-weight-bold mt-2">Vendor Details</h2> 
       }

       <SearchBar
          keyword= {keyword}
          setKeyword = {setKeyword}
         />
        <div className= "container category-center"> 
        <div className= "row mb-2">
        <div className = "col col-md-2">
            <h5 className= "font-weight-bold"> Name</h5>
        </div>
        <div className = "col col-md-2 ">
             <h5 className= "font-weight-bold">  Email </h5>
       </div>
       <div className = "col col-md-4 ">
             <h5 className= "font-weight-bold">  Address </h5>
       </div>
       <div className = "col col-md-2 ">
             <h5 className= "font-weight-bold">  Website </h5>
       </div>
      </div>    
    <form>   
         {renderList()}
    </form> 
    </div>
   </div> 
 </div>

  )  
}

export default VendorAdminList;