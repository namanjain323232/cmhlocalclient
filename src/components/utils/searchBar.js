import React, {useState} from "react";

const SearchBar = ({keyword,setKeyword}) =>
{

  const handleSearch = (e) => {
   e.preventDefault();
   setKeyword(e.target.value.toLowerCase());
   }
  
   return (
    <div className= "pt-4 ">
       <input
          type= "search"
          placeholder= "Enter a keyword"
          value= {keyword}
          className= "form-control mb-4"
          onChange= {handleSearch}
        />
          </div>
   )
}
export default SearchBar;
