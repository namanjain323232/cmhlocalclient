import React, {useState} from "react";
import {useSelector} from "react-redux";
import AdminMenu from "../AdminMenu";
import { addSubcategory } from "../../../actions/subcategory";
import SubcategoriesForm from "./SubcategoriesForm";
import AdminNav from "../../navigation/AdminNav";
import { toast } from "react-toastify";

const  SubcategoriesCreate = () =>
{  
  const {user} = useSelector( state => ({...state})); 
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [hide, setHide] = useState("No");
  const [type, setType] = useState("Face to Face","Online","Both");
  const [loading, setLoading] = useState(false);

  const addRoute = () => {
     return("/admin/subcategories/subcategoriescreate");
   }

   const handleSubmit= (e) => {
      e.preventDefault();
      setLoading(true);
      addSubcategory({category: category, name: name, hide: hide,type: type}, user.token)
      .then ( (res) => {
         setLoading(false);
         setCategory("");
         setName("");
         toast.success(`Successfully added sub category: ${res.data.name}`);
      })
      .catch ( (err) => {
         console.log(err);
         setLoading(false);
         if(err.response===400) 
             toast.error(err.response.data);
          else
             toast.error(err.response);
    })
   }
     
    return (              
           <div className= "row"> 
             <div className= "col col-md-2">
                <AdminNav />
             </div> 
             <div className= "col col-md-9">          
             <AdminMenu 
               addRoute = {addRoute()}
             />
             { (loading) ? <h2>Loading....</h2>
                        : <h2 className="category-head font-weight-bold card-header"> Add New Sub Category</h2>
             }                 
            <div className = "card  mb-2" >
               <div className= " card-body mb-1 " >                              
                 <SubcategoriesForm
                    handleSubmit = {handleSubmit}
                     category= {category}
                     setCategory= {setCategory}
                     name= {name}
                     setName= {setName}
                     hide= {hide}
                     setHide= {setHide}  
                     type = {type}    
                     setType = {setType}               
                  />
                </div>
              </div> 
             </div>
           </div>                          
            ); 
      }      
  
export default SubcategoriesCreate;