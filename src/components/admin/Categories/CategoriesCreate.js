import React, {useState} from "react";
import { connect } from "react-redux";
import {useSelector} from "react-redux";
import AdminNav from "../../navigation/AdminNav";
import { addCategory} from "../../../actions/category";
import AdminMenu from "../AdminMenu";
import { toast } from "react-toastify";
import CategoriesForm from "./CategoriesForm";

const CategoriesCreate = () =>
{
  const {user} = useSelector( state => ({...state}));
  const [name,setName] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [loading,setLoading] = useState(false);
  

   const addRoute= () => {
    return("/admin/categories/categoriescreate");
   } 

   
   const handleSubmit= (e) => {
            e.preventDefault();
            setLoading(true);
            addCategory({name: name, imgURL: imgURL}, user.token)
            .then ( (res) => {
             setLoading(false);
             setName("");
             setImgURL("");
             toast.success(`Successfully created ${res.data.name}`);
            })
            .catch (err => {
              console.log(err);
              setLoading(false);
              if(err.response===400) 
                 toast.error(err.response.data);
              else
                  toast.error(err.response);
            })
   }
    
  
   return(
    <div className= "row"> 
  
     <div className= "col col-md-3" >
        <AdminNav />
     </div> 
     <div className= "col col-md-6">
       <AdminMenu 
        addRoute= {addRoute()} />  
      <section className= "vendor-center">  

      { loading ? <h2>Loading....</h2> 
                : <h2 className="card-header font-weight-bold" > Add New Categories </h2>  }    
       
       <div className = "card  mb-2" >
     <div className= " card-body mb-1 " >   
      <CategoriesForm 
        handleSubmit = {handleSubmit}
        name= {name}
        setName= {setName}
        imgURL= {imgURL}
        setImgURL= {setImgURL}
      />
    </div>
    </div>
   </section>
   </div> 
   </div>  
   
  );
}

export default CategoriesCreate;

