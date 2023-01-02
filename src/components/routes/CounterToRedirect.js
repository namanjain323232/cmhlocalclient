import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

let interval = 0;

const CounterToRedirect = () => {

    return ( "hello")

    // const [count,setCount] = useState(5);
    // const history = useHistory();

    // useEffect(() => {

    //   interval= setInterval( () => {
    //         setCount( (currentCount) => --currentCount);
    //     },1000);

    //     count === 0 && history.push("/");
        
    //     //cleanup
    //     return () => clearInterval(interval);

    // },[count,history]);

    // return (
    //     <div className= "container  text-center">
    //        <h5>Redirecting you in {count} seconds....</h5>
    //     </div>        
    // )
}

export default CounterToRedirect;