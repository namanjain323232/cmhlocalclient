import React, {useState, useEffect} from "react";
import { Link} from "react-router-dom";
import AdminNav from "../../navigation/AdminNav";
import {fetchCategories, fetchCategoriesName} from "../../../actions/category";
import {fetchSubcategories} from "../../../actions/subcategory";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import SearchBar from "../../utils/searchBar";
import AdminMenu from "../AdminMenu";

const  SubcategoriesList = () =>
{

  const [category, setCategory] = useState([]);
  const [sub, setSub] = useState([]);
  const [keyword, setKeyword] = useState("");


  useEffect(() => {
     getCategories();
     getSubcategories();
  }, []);

  const getCategories= () => {
    fetchCategories().then( (cat) => setCategory(cat.data));
  }

  const getSubcategories= () => {
    fetchSubcategories().then( (subcat) => setSub(subcat.data));
   }


 const addRoute= () => {
    return("/admin/subcategories/subcategoriescreate");
 }

 const searchValue= (keyword) => (res) => res.name.toLowerCase().includes(keyword);

 const renderList= () => 
 {    
    return (      
       sub.filter(searchValue(keyword)).map( subcategory => 
       {
        { if (subcategory._id)  
            return (
                <div className= "row" key= {subcategory._id}>                  
                 <div className= "col col-md-3 category">                  
                      {subcategory.category.name} 
                 </div>
                  <div className= "col col-md-3 text-align-right category">
                      {subcategory.name}
                  </div>     
                  <div className= "col col-md-2 text-align-right category">
                      {subcategory.type}
                  </div>     
                  <div className= "col col-md-2 text-align-right category">
                      {subcategory.hide}
                  </div>            
                  <div className= "col-md-2 mb-1">
                      <Link to= {`/admin/subcategories/subcategoriesedit/${subcategory.slug}`} 
                                   className= "btn btn-primary  mr-1 ">
                                   <EditOutlined /></Link>
                      <Link to= { `/admin/subcategories/subcategoriesdelete/${subcategory.slug}`}
                            className= "btn btn-danger mr-1">
                            <DeleteOutlined /></Link>    
                   </div>
                 </div>
                 )        }       
        })    
    )}


  return(
    <div className= "row">
      <div className= "col-md-2">
          <AdminNav />
      </div>

      <div className= "col-md-9" >
         <AdminMenu 
             addRoute = {addRoute()}
        />
      
       { (!sub) ? <h2>Loading.....</h2> 
                   :<h2  className= "card-header font-weight-bold mt-2">Sub Categories</h2> 
       }

       <SearchBar
          keyword= {keyword}
          setKeyword = {setKeyword}
         />
        <div className= "container category-center"> 
        <div className= "row mb-2">
        <div className = "col col-md-3">
            <h5 className= "font-weight-bold"> Category </h5>
        </div>
        <div className = "col col-md-3 ">
             <h5 className= "font-weight-bold">  Sub Category </h5>
       </div>
       <div className = "col col-md-2 ">
             <h5 className= "font-weight-bold">  Type </h5>
       </div>
       <div className = "col col-md-2 ">
             <h5 className= "font-weight-bold">  Hide </h5>
       </div>
       </div> 
       <form>   
         {renderList()}
       </form>
      </div>
      </div>
    </div>

  )  
}

export default SubcategoriesList;