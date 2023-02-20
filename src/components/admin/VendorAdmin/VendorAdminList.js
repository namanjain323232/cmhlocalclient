import React, {useState, useEffect} from "react";
import { Link} from "react-router-dom";
import AdminNav from "../../navigation/AdminNav";
import {fetchRegVendors,fetchRegVendorSlug} from "../../../actions/vendorInfo";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import SearchBar from "../../utils/searchBar";
import AdminMenu from "../AdminMenu";

const  VendorAdminList = () =>
{

  const [vendor, setVendor] = useState([]);
  const [regVendors,setRegVendors]= useState([]);
  const [ven, setVen] = useState([]);
  const [loading,setLoading]= useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {     
     getRegVendors();   
  }, []);

  const getRegVendors = () => {
   setLoading(true);
   fetchRegVendors().then( (res) => setRegVendors(res.data));
   setLoading(false);
  }

  
 const addRoute= () => {
    return("/admin/vendoradmin/vendoradmincreate");
 }

 const searchValue= (keyword) => (res) => res.name.toLowerCase().includes(keyword);

 const renderList= () => 
 {    
    return (      
      regVendors.filter(searchValue(keyword)).map( regvendor => 
        {
           { if (regvendor._id)  
              return (
                <div className= "row" key= {regvendor._id}>                  
                 
                   <div className= "col col-md-2 text-align-right category ">
                       {regvendor.name}
                    </div>     
                    <div className= "col col-md-1 text-align-right category">
                       {regvendor.email}
                    </div>  

                  <div className= "col col-md-3 text-align-right category">
                  <ul>
                         <li>{regvendor.houseNo} ,{regvendor.addressLine1}</li>
                         <li>{regvendor.addressLine2}</li>
                         <li>{regvendor.city}</li>
                          <li>{regvendor.county}</li>
                          <li>{regvendor.postcode}</li>
                         <li>{regvendor.country}</li>
                  </ul> 
                    </div>    
                    <div className= "col col-md-2 text-align-right category">
                       {regvendor.website}
                    </div>  
                    <div className= "col col-md-2 text-align-right category">
                       {regvendor.userId.stripe_account_id}
                    </div>           
            <div className= "col-md-2 mb-1">
              <Link to= {`/admin/vendoradmin/vendoradminedit/${regvendor.slug}`} 
                            className= "btn btn-primary  mr-1 ">
                           <EditOutlined /></Link>
               <Link to= { `/admin/vendoradmin/vendordelete`}
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
      
       { (!ven) ? <h2>Loading.....</h2> 
                   :<h2  className= "card-header font-weight-bold mt-2">Vendor Details</h2> 
       }

       <SearchBar
          keyword= {keyword}
          setKeyword = {setKeyword}
         />
        <div className= "container category-center"> 
        <div className= "row mb-3 category">
        <div className = "col col-md-2 category">
            <h5 className= "font-weight-bold"> Name</h5>
        </div>
        <div className = "col col-md-1  category">
             <h5 className= "font-weight-bold">  Email </h5>
       </div>
       <div className = "col col-md-3 ">
             <h5 className= "font-weight-bold">  Address </h5>
       </div>
       <div className = "col col-md-2 ">
             <h5 className= "font-weight-bold">  Website </h5>
       </div>
       <div className = "col col-md-2 ">
             <h5 className= "font-weight-bold">  Stripe Account </h5>
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