import _ from "lodash";
import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { editCategory, fetchCategory} from "../../../actions/category";
import AdminMenu from "../AdminMenu";
import AdminNav from "../../navigation/AdminNav";
import CategoriesForm from "./CategoriesForm";
import { toast } from "react-toastify";

const  CategoriesEdit = ({history, match}) =>
{
  const {user} = useSelector( (state) => ({...state}));
  const [loading,setLoading] = useState(false);
  const [name, setName] = useState("");
  const [imgURL, setImgURL] = useState("");

  const slug= match.params.slug;

  useEffect( () => {
    getCategory();
  }, [] );

  const getCategory = () => {
   fetchCategory(slug).then ( (res) =>
          {
          setName(res.data.name)
          setImgURL(res.data.imgURL)
          });
     }

  const addRoute= ()=> {
   return("/admin/categories/categoriescreate");
  } 

  
  const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      editCategory(slug,{name: name, imgURL: imgURL}, user.token)
      .then ( (res) => {
        setLoading(false);
        setName("");
        setImgURL("");
        toast.success(`${res.data.name} is updated successfully`);  
             
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
      {loading ? <h1>Loading....</h1> 
               : <h1 className="card-header font-weight-bold" > Edit Categories </h1>
      }
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

export default CategoriesEdit;



