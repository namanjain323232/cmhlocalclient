import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {SearchOutlined} from "@ant-design/icons";

 const Search = () =>
 {
  const dispatch = useDispatch();
  const {search} = useSelector( state => ({...state}));
  console.log("Search", {search})
   const {text} = search;
  const history = useHistory();

  
   const handleSearch = (e) => {
     dispatch({
       type: "SEARCH_QUERY",
       payload: {text: e.target.value}
     })
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      history.push(`/shop?${text}`)
    }

   return (
       <form className= "form-inline my-2 my-lg-0"
             onSubmit= {handleSubmit}
      >
          <input
             type= "search"
             placeholder= "Search"
             value= {text}
             className= "form-control mr-sm-2" 
             onChange= {handleSearch}           
           />
          <SearchOutlined onClick={handleSubmit} 
                          className= "float-center"
                          style= {{ cursor: 'pointer'}}
          />
       </form>
   )
}
export default Search;
