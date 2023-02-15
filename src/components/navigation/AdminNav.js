import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav className="navbar mt-3 navlist">
      <ul className="nav flex-column font-weight-bold ">
        <li className="nav-item mb-3">
          <Link to="/admin/categories/categorieslist">CATEGORIES</Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/admin/subcategories/subcategorieslist">
            SUB CATEGORIES
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/admin/questions/questionslist">QUESTIONS</Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/admin/subcatquestions/subcatquestionslist">
            SUB CATEGORY QUESTIONS
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/admin/vendoradmin/vendoradminlist">
               VENDOR DETAILS
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/admin/queries/querieslist">CUSTOMER QUERIES</Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/vendor/vendorcatlist">VENDOR CATEGORIES</Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/vendor/vendorpassword">VENDOR PASSWORD</Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/user/userpassword">USER PASSWORD </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/admin/timeslot/listslots">MANAGE TIMESLOTS</Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/admin/areas/listareas">UPLOAD AREAS</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
