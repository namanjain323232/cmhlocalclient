import React, { useState,useEffect } from "react";
import UserNav from "../navigation/UserNav";
import ConnectNav from "../navigation/ConnectNav";
import {getUserOrders} from "../../actions/user";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import {useSelector, useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {PDFDownloadLink} from "@react-pdf/renderer";
import Invoice from "../order/Invoice";

const UserHistory = () => {

 const {user} = useSelector( (state) => ({...state}));
 const [orders, setOrders] = useState([]);

 useEffect( () => {
   loadUserOrders();
 },[]);

 const loadUserOrders= () => {
     getUserOrders(user.token).then ( res => {
        setOrders(res.data);
        console.log(res.data);
     })
     .catch((err) => {
       console.log(err);
     });
 }

 const showEachOrder= () => 
    orders.map((order,i) => (
       <div className= "card m-5 p-3" key={i}>
           <ShowPaymentInfo order= {order} />
           {showOrdersInTable(order)}
           <div className="row">

          
             {/* <div className="col">
               {showDownloadLink(order)}
             </div> */}
           </div>
       </div>
    )
    )

    const showOrdersInTable= (order) => (
       <table className="table table-bordered  h6">
         <thead className="thead-light">
         <tr>
          <th scope="col">Helper Name </th>
          <th scope="col">Sub Category </th>
          <th scope="col">Price </th>
          <th scope="col">PriceType </th>
          <th scope="col">Count </th>  
         </tr>             
         </thead>
         <tbody>
            {order.vendors.map((v,i) => 
            (
              <tr key= {i}>
                <td><b>{v.vendor.vendorInfoId.name}</b></td>
                <td><b>{v.vendor.subcategories[0].name}</b></td>
                <td><b>{v.vendor.price}</b></td>
                <td><b>{v.vendor.pricetype}</b></td>
                <td><b>{v.count}</b></td>
              </tr> 
            )            
            )}
         </tbody>
       </table>
    )

    const showDownloadLink= (order) => (
      <PDFDownloadLink document= {
         <Invoice order= {order} />
      }
      filename= "invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
      >     
        PDF Download
      </PDFDownloadLink>
   )
   return(
    <div className= "container-fluid">
       <div className= "container-fluid bg-secondary p-5">
          <ConnectNav />
      </div>
        <div className= "row ml-0 text-align-top">
           <div className= "col-md-2">
               < UserNav />   
           </div>
        
       <div className= "col ">            
           {orders.length 
             ? <h3> User Orders Details</h3> 
             : <h3> No  Orders</h3>
            } 
            {showEachOrder()} 
        </div>
      </div>        
       
    </div>
   )
}

export default UserHistory;