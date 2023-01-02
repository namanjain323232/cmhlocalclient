import React from "react";
import {Link} from "react-router-dom";

const UserNav = () => {
  return (
    <nav className="navbar navbar-default navbar-top navlist mt-3">
      <ul className= "nav flex-column font-weight-bold ">
        <li className= "nav-item mb-2">
          <Link to= "/user/history" className= "nav-link">USER HISTORY</Link>
        </li>
        <li className= "nav-item mb-2">
          <Link to= "/user/userpassword" className= "nav-link">PASSWORD RESET</Link>
        </li>        
      </ul>
    </nav>  
  ) 
  }

export default UserNav;