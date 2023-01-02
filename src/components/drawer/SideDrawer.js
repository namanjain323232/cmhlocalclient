import react from "react";
import {Drawer,Button} from "antd";
import {useSelector,useDispatch} from "react-redux";
import {Link} from "react-router-dom";

const SideDrawer= () => {

    const dispatch= useDispatch();

    const {cart,drawer} = useSelector( (state) => ({...state}));

    return (

        <Drawer 
          title={`Cart / ${cart.length} Helpers`}
          onClose= { () => {
            dispatch({
              type: "SET_VISIBLE",
              payload:false
          });
        }} visible={drawer} >
           { cart.map( (c) => (
            <div className="row" key= {c._id}>
               <div className="col">
                {c.images[0] ? 
                <>               
                <img src= {c.images[0].url}
                  style= {{ width:"100%", height:"60px",objectFit:"cover"}}
                />                   
                <p className=  "bg-secondary font-weight-bold">{c.vendorInfoId.name} x {c.count}</p> 
                </>
                : 
                <>
                "No image"
                <p className= "background-secondary font-weight-bold">{c.vendorInfoId.name} x {c.count}</p> 
                </>
                } 
              </div>   
             
            </div>
           ))}
           <Link to="/cart">
           <button className= "btn btn-primary btn-raised btn-block"
                   onClick= { () => 
                     dispatch({
                         type: "SET_VISIBLE",
                         payload:false
                   })  
                   }
           >
              Go To Cart
           </button>
           </Link>
        </Drawer>
    )

}

export default SideDrawer;