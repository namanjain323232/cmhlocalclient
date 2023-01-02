import  React from "react";
import {Link} from "react-router-dom";

const VendorCategories = () =>
{
    return (
        <div>
           <Link to= "/admin" className= "d-flex justify-content-center admin-class">Admin</Link>
            Vendor Categories
        </div>
    )
}

export default VendorCategories;