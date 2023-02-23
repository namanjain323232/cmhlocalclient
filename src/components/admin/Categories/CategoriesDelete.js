import React, {useEffect, useState,Fragment} from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { fetchCategories,deleteCategory} from "../../../actions/category";
import AdminMenu from "../AdminMenu";
import Modal from "../../Modal";
import history from "../../../history";
import { toast } from "react-toastify";


const CategoriesDelete = (props) =>
{
   const {user} = useSelector( state => ({...state}));
   const [loading, setLoading] = useState(false);
   const [categories, setCategories] = useState([]);
   const slug = props.match.params.slug;

   useEffect( () => {
       getCategories();
   }, [] );

   const getCategories = () => {
      fetchCategories().then ( (res) => setCategories(res.data));
   }

   const addRoute= () => {
     return("/admin/categories/categoriescreate");
   } 
  
   const handleDelete = () => {
      setLoading(true);
      deleteCategory(slug, user.token)
      .then ( res => {
          setLoading(false);
          toast.success(`Category deleted successfully: ${slug}`);
          getCategories();           
      })
      .catch ( (err) => {
             console.log(err);
             setLoading(false);
             if(err.response===400) 
                  toast.error(err.response.data);
             else
                  toast.error(err.message);
         });
   }

    const renderActions = () => {
       
      return (
         <React.Fragment>
         <button onClick= { () => {handleDelete()}    } 
            type="submit" className=" btn btn-danger primary-button mr-3">Yes</button>
         <Link to= "/admin/categories/categoriesList" 
               type="button" className= "btn btn-secondary primary-button">No</Link>
         </React.Fragment>
         );
    }

    const renderContent= () => {
       
       if(!slug) {
          return ("Are you sure you want to delete this category?");
       }
          return(`Are you sure you want to delete the category: ${slug}`);
      }
   
   return(
   <div>
       <AdminMenu  
        addRoute= {addRoute()}
        />         
        <Modal 
            title= "Delete a Category"
            content= {renderContent()}
            actions= {renderActions()}
            onDismiss = {() => history.push("/admin/categories/categorieslist") }
         />
    </div>    
     );
}

export default CategoriesDelete;
