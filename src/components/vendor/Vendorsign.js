import React, {useState} from "react";
import PostcodeSearch from "./VendorProducts/PostcodeSearch";
import AddressList from "./VendorProducts/AddressList";
import PostcodeValues from "./VendorProducts/PostcodeValues";


const  Vendorsign  = () => {

   const [addresses, setAddressses] = useState([]);

   const onSearchSubmit = async (postcodeVal, houseNoVal) =>
   {
      const response = await PostcodeValues.get("find/"+postcodeVal + "/" +houseNoVal) ;
      setAddressses(response.data.addresses);
   }
   return (
      <div>

      <section className="vendor-center">
      <div className="card">
                <h1 className="h2 font-weight-bold card-header">Create your account</h1>
                <div className="card-body"></div>
         {/* <VendorDetails
               labelVal ="First Name*"
               placeholderVal="Enter first name"
            />
            <VendorDetails
               labelVal ="Last Name*"
               placeholderVal="Enter last name"
            /> */}
            <PostcodeSearch
               onSubmit={onSearchSubmit}
            />
            <AddressList addresses= {addresses} />

             {/* <div>
              <VendorDetails
                name = "address1"
                labelVal ="Address Line 1"
                placeholderVal="Enter address line 1"
                value = ""
             />
              <VendorDetails
                 labelVal ="Address Line 2"
                 placeholderVal="Enter address line 2"
                 value = ""
              />
              <VendorDetails
                 labelVal ="City*"
                 placeholderVal="Enter city"
                 value = ""
               />
               <VendorDetails
                   labelVal ="County*"
                   placeholderVal="Enter county"
                   value= ""
                />
                <VendorDetails
                   labelVal ="Country*"
                   placeholderVal="Enter country"
                  value = ""
                />
             </div> */}
        </div>
       </section>

      </div>
      );
      }

export default Vendorsign;
