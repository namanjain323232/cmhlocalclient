import React from "react";
import {Link} from "react-router-dom";

const Vendor = () =>
{
    return (
        <div>
           <Link to= "/admin" className= "d-flex justify-content-center admin-class">Admin</Link>
            Vendor Master
        </div>
    )
}
export default Vendor;