import React from "react";
import { Route,Redirect} from "react-router-dom";
import { useSelector } from "react-redux";
import CounterToRedirect from "./CounterToRedirect";

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  // debugger
  return user && user.token ? (
    <Route {...rest} 
    // render={() => children}
     />
  ) : (
     <Redirect  to= "/" />
    // <CounterToRedirect />
  );
};

export default UserRoute;
