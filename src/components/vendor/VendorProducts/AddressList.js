import React from "react";

const AddressList = (props) => {
    const addressValues = props.addresses.map( (foundAddress) =>
    {
      let splitAddress = foundAddress.split(",");
      let finalAddress = {
         line1: splitAddress[0],
         line2: splitAddress[1],
         locality: splitAddress[4],
         city: splitAddress[5],
         county:splitAddress[6]
      };
       return( {finalAddress} );

   } ) ;

    const outputAddresses = addressValues.map( outputAddress =>
     {
       return (

         <div>
            hello bazu
                  {/* <VendorDetails
                     labelVal ="Address Line 1"
                     placeholderVal={outputAddress.finalAddress.line1}
                     value = {outputAddress.finalAddress.line1}
                  />

                  <VendorDetails
                     labelVal ="Address Line 2"
                     placeholderVal={outputAddress.finalAddress.locality}
                     value = {outputAddress.finalAddress.locality}
                  />
                  <VendorDetails
                     labelVal ="City*"
                     placeholderVal={outputAddress.finalAddress.city}
                     value = {outputAddress.finalAddress.city}
                   />
                   <VendorDetails
                       labelVal ="County*"
                       placeholderVal={outputAddress.finalAddress.county}
                       value= {outputAddress.finalAddress.county}
                    />
                    <VendorDetails
                       labelVal ="Country*"
                       placeholderVal="United Kingdom"
                      value = "United Kingdom"   /> */}
                 </div>
               )
               } );

    return(outputAddresses);
   }

export default AddressList;
