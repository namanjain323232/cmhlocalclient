import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {Card, Tooltip} from "antd";
import {EyeOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {showAverageRating} from "../../actions/rating";
import _ from "lodash";

const {Meta} = Card;
const VendorCard= ({vendor}) => {

  {console.log("Value of VENDOR from VENDOR CARD", vendor)}

  const {user, cart} = useSelector((state) => ({...state}));

   const [subcats, setSubcats] = useState([]);   
   const [tooltip, setTooltip] = useState('Click to add');
   const {_id,vendorInfoId, images, description, subcategories,price,pricetype} = vendor;

   const dispatch= useDispatch();

    useEffect( () => {
      fetchSubcats();
    },[]);

    const fetchSubcats= () => {
        subcategories.map( (sub) => { 
          <div key={sub._id}>
          setSubcats(sub.name||",") 
          </div>          
         })
    }
     
    const handleAddToCart= () => {
      let cart = [];
      //check if the cart already has an item
      if ( typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
          cart= JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({
          ...vendor,
          count: 1
        })
        let unique=_.uniqWith(cart,_.isEqual);
        console.log(unique);
        localStorage.setItem("cart",JSON.stringify(unique));
        setTooltip("Added");

        //add to redux store
        dispatch({
          type: "ADD_TO_CART",
          payload:unique
        });
        dispatch({
          type: "SET_VISIBLE",
          payload:true
        });
      }
    } 
     return (
       <div>
        { vendor && vendor.ratings && vendor.ratings.length > 0
              ? showAverageRating(vendor)
              : <div className= "d-flex justify-content-center mt-1 mb-3">"No rating yet"</div>
        }
         <Card cover= {
            <img src= { images && images.length ? images[0].url : ""} 
                 style= {{ height: "180px", objectFit: "cover"}}
            />
         }
         actions= {[ <Link to= {`/vendordetails/${_id}`}>
                      <EyeOutlined  className= "text-warning" /> <br />View Vendor Details
                      </Link>,
                    <Tooltip title= {tooltip}>
                     <a onClick= {handleAddToCart}>
                      <ShoppingCartOutlined  className= "text-info" /><br />Select Vendor
                      </a>
                    </Tooltip>
                 ]}
         >
           <Meta title= {`${vendorInfoId.name}-£${price} ${pricetype}`} description= {subcats} />                                         
         </Card>
       </div>
     )
}

export default VendorCard;