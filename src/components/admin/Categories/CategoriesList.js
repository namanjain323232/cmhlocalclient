import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../navigation/AdminNav";
import AdminMenu from "../AdminMenu";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import { fetchCategories } from "../../../actions/category";
import SearchBar from "../../utils/searchBar";


const CategoriesList = () =>
{    
const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(false);
const [keyword, setKeyword] = useState("");

 useEffect( () => {        
      getCategories()
    },[]);

const getCategories = async () => {
   setLoading(true);
   fetchCategories().then( (res) => setCategories(res.data));
   setLoading(false);
}

 const addRoute= () => {
  return("/admin/categories/categoriescreate");
 }

 
 const searchValue= (keyword) => (res) => res.name.toLowerCase().includes(keyword);
 
 const renderList = () => 
 {
    return (categories.filter(searchValue(keyword)).map( category =>
    {
     
      {if(category.name)
        return (                   
          <div className= "row"  key= {category._id}>            
              <div className= "col col-md-2 mb-2  category" >
              {category.name}
              </div>
              <div className= "col col-md-8 mb-2 category ">
              {category.imgURL}
              </div>
              <div className= "col col-md-1 mb-2 category">
              {category.hide}
              </div>
              <div className= "col-md-1 mb-1">
              <Link to= {`/admin/categories/categoriesedit/${category.slug}`} 
                 className= "btn btn-primary  mr-1 "><EditOutlined/>
              </Link>
              <Link to= {`/admin/categories/categoriesdelete/${category.slug}`} 
                        className= "btn btn-danger mr-1 "><DeleteOutlined/>
              </Link>
              </div>
            </div>                    
        )
      }  
    })
      )
}

 return (
     <div className= "row" >
       <div className= "col col-md-2">
        <AdminNav />
       </div>  
       <div className = "col col-md-6 category">  
         <AdminMenu
            addRoute= {addRoute()}
         />
       { (!categories) 
          ? <h2>Loading.....</h2>  
          : <h2 className= "card-header font-weight-bold mt-2">Categories</h2>
       }

       <SearchBar
          keyword= {keyword}
          setKeyword = {setKeyword}
         />

       <div className= "container-fluid category-center"> 
       <div className = " row">  
        <div className= " col col-md-2">     
            <h5 className= "float-center font-weight-bold"> Category Name</h5>
        </div>
        <div className = "col col-md-8">
             <h5 className= "float-center font-weight-bold">  Image URL</h5>
       </div>
       <div className = "col col-md-1">
             <h5 className= "float-center font-weight-bold">  Hide</h5>
       </div>
       </div> 
       </div>
        <form>         
           {renderList()}
         </form>
   </div>
   </div>
           
 )
}

export default CategoriesList;
