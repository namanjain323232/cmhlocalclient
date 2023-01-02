import React, {useState, useEffect} from "react";
import {toast} from "react-toastify";
import VendorCard from "../cards/VendorCard";
import LoadingCard from "../cards/LoadingCard";
import {fetchSubcategory,fetchSubcatVendors} from "../../actions/subcategory";
import {Pagination} from "antd";


const GetVendorsSubcat= ({match}) => {
    
    const [subcat, setSubcat] = useState([]);
    const [vendors,setVendors] = useState([]);
    const [loading,setLoading] = useState(false);
    const [page,setPage] = useState(1);
    const [vendorsTotal, setVendorsTotal]= useState(0);

    useEffect( () => {
        loadSubcat();
        loadVendorsSubcat();
    },[]);

   const loadSubcat= (() => {
      setLoading(true);
      fetchSubcategory(match.params.slug).then ( (sub) => setSubcat(sub.data));
      setLoading(false);
   });

    const loadVendorsSubcat = () => {
        setLoading(true);
        fetchSubcatVendors(match.params.slug)
        .then ( (res) => {
            setVendors(res.data)
            setLoading(false);
         })
        .catch ( (err) => {
            console.log(err);
            setLoading(false);
            toast.error(err.message);
        })
    }

    return (
        <div>
          <div className= "container-fluid">
               { loading ? <h4 className= "text-center p-3 mt-5 mb-5  jumbotron">Loading....</h4>
                      : <h4 className= "float-center p-3 mt-5 mb-5 jumbotron">                      
                       We found {vendors.length} {subcat.name} in your area
                      </h4>
            }
             <div className="row ml-2" key={vendors._id}> 
             {vendors.map( (vendor) => (      
                 <VendorCard 
                     vendor= {vendor}
                     key={vendor._id}
                 />              
             ))}
            </div>            
            
          <div className="row ">
            <nav className= "col col-md-4 offset-md-4 pt-5 p-3 d-flex justify-content-center">        
              <Pagination  current= {page}
                    total= {(vendorsTotal / 3) * 10}
                    onChange={ (value) => setPage(value)}          />         
            </nav>          
          </div>
        </div>           
        </div>
    )
}

export default GetVendorsSubcat;