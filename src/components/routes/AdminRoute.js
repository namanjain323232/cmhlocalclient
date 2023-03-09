import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { adminUser } from "../../actions/auth";
// import CounterToRedirect from "./CounterToRedirect";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  // console.log("User Role", user);
  //   debugger
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      adminUser(user.token)
        .then((res) => {
          //  console.log("Admin route response",res);
          setAdmin(true);
        })
        .catch((err) => {
          console.log("Admin route err", err);
          setAdmin(false);
        });
    }
  }, [user]);
  //  console.log("ADMIN VAL",admin);
  return <Route {...rest} />;

  // return admin ? <Route {...rest}  />  : <Redirect  to= "/" />
  // <CounterToRedirect />
};

export default AdminRoute;
