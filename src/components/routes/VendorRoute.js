import React,{useState,useEffect} from "react";
import { Route,Redirect} from "react-router-dom";
import { useSelector } from "react-redux";
import {adminUser} from "../../actions/auth";
// import CounterToRedirect from "./CounterToRedirect";

const VendorRoute = ({ children, ...rest }) => {

  const { user } = useSelector((state) => ({ ...state }));

  const [vendor, setVendor] = useState(false);

  useEffect( () => {
      if (user && user.token) {
          vendorUser(user.token)
      .then ( res => {
          console.log("Vendor user Route",res);
          setVendor(true);
      })
      .catch ( (err) => {
         console.log("Vendor route error",err);
         setVendor(false);
      })
      }

  }, [user]);

  return admin ? (
    <Route {...rest} render={() => children} />
  ) : (
     <Redirect  to= "/" />
    // <CounterToRedirect />
  );
};

export default VendorRoute;