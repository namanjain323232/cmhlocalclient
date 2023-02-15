import React, {useState, useEffect} from "react";
import { Link} from "react-router-dom";
import AdminNav from "../../navigation/AdminNav";
import {fetchVendorInfo} from "../../../actions/vendorInfo";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import SearchBar from "../../utils/searchBar";
import AdminMenu from "../AdminMenu";
import VendorInfoCard from "../../cards/VendorInfoCard";

const  VendorAdminList = () =>
{

    const [vendors,setVendors] = useState([]);
    const [loading,setLoading] = useState(false);
    const [keyword,setKeyword] = useState("");
  
  
//   useEffect(() => {
//      fetchVendorInfo();    
//   }, []);

 
// const fetchVendorInfo = () => {
// setLoading(true);
// fetchVendorInfo().then( (res) => setVendors(res.data));
// setLoading(false);
// }


// const addRoute= () => {
//     return("/vendor/vendorinfocreate");
//    }

//    const searchValue= (keyword) => (res) => res.name.toLowerCase().includes(keyword);

//    const renderList = () => {

//     return (
//        vendors && vendors.filter(searchValue(keyword)).map( (vendor) => {
//         return(
//         <div className= "row"  key= {vendor._id}> 
//          <VendorInfoCard  vendor= {vendor}                                
//        />
//       </div>        
        
//         )
//        })
//     )
//    }

//   return(
//     <div className= "row">
//       <div className= "col-md-2">
//           <AdminNav />
//       </div>

//       <div className= "col-md-9" >
//          <AdminMenu 
//              addRoute = {addRoute()}
//         />
      
       
    { loading ? <h2>Loading....</h2>
               : <h2 className= "font-weight-bold mb-2">List of Vendors</h2>
     }

//        <SearchBar
//           keyword= {keyword}
//           setKeyword = {setKeyword}
//          />
//         <div className= "container category-center"> 
//         <div className= "row mb-2">
//         <div className = "col col-md-2">
//             <h5 className= "font-weight-bold"> Email </h5>
//         </div>
//         <div className = "col col-md-2 ">
//              <h5 className= "font-weight-bold">  Name </h5>
//        </div>
//        <div className = "col col-md-4 ">
//              <h5 className= "font-weight-bold">  Address </h5>
//        </div>
//        <div className = "col col-md-2 ">
//              <h5 className= "font-weight-bold">  Website </h5>
//        </div>
//        </div> 
//        <form>   
//          {renderList()}
//        </form>
//       </div>
//       </div>
//     </div>

//   )  

}

export default VendorAdminList;