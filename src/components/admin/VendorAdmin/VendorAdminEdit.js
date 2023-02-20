import _ from "lodash";
import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import {fetchRegVendorSlug,editVendorInfo} from "../../../actions/vendorInfo";
import AdminMenu from "../AdminMenu";
import AdminNav from "../../navigation/AdminNav";
import VendorAdminForm from "./VendorAdminForm";
import { toast } from "react-toastify";

const  VendorAdminEdit = ({history, match}) =>
{
  const {user} = useSelector( (state) => ({...state}));
  const [loading,setLoading] = useState(false);
  const [name, setName] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [hide, setHide]  = useState("");  

  const slug= match.params.slug;

  useEffect( () => {
    getVendorInfo();
  }, [] );

  const getVendorInfo = () => {
   fetchRegVendorSlug(slug).then ( (res) =>
          {
          setName(res.data.name)
          setImgURL(res.data.imgURL)
          setHide(res.data.hide)
          });
     }

  const addRoute= ()=> {
   return("/admin/categories/categoriescreate");
  } 

  
  const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      // editCategory(slug,{name: name, imgURL: imgURL, hide: hide}, user.token)
      // .then ( (res) => {
      //   setLoading(false);
      //   toast.success(`${res.data.name} is updated successfully`);  
             
      // })
      // .catch (err => {
      //   console.log(err);
      //   setLoading(false);
      //   if(err.response===400) 
      //      toast.error(err.response.data);
      //   else
      //       toast.error(err.response);
      // })
  }    
  
   return (
   <div className= "row">
     <div className= "col col-md-3" >
        <AdminNav />
     </div> 
     <div className= "col col-md-6">
     <AdminMenu 
        addRoute= {addRoute()} 
      />
       <section className= "vendor-center"> 
      {loading ? <h2>Loading....</h2> 
               : <h2 className="card-header font-weight-bold" > Change Vendor Details </h2>
      }
      <div className = "card  mb-2" >
        <div className= " card-body mb-1 " >  
        <VendorAdminForm 
        handleSubmit = {handleSubmit}
        name= {name}
        setName= {setName}
        imgURL= {imgURL}
        setImgURL= {setImgURL}
        hide= {hide}
        setHide= {setHide}
      />
              
        </div>
       </div>
      </section>
      </div>
    </div>   
  );
}

export default VendorAdminEdit;



