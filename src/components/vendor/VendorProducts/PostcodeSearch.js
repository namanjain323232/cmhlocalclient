import React, {useState} from "react";

const PostcodeSearch = ({onSubmit}) =>
{
  const [postcodeVal, setPostcodeVal] = useState("");
  const [houseVal, setHouseVal] = useState("");

  const onPostcodeChange = (event) =>
  {
    setPostcodeVal(event.target.value);
  }

  const onHouseChange = (event) =>
    {
      setHouseVal(event.target.value);
    }


  const onSearchSubmit= (event) =>  {
    console.log(postcodeVal,houseVal);
    event.preventDefault();
    onSubmit(postcodeVal,houseVal);
  }

  return(
    <div>
     <form  className = "ui form" onSubmit={onSearchSubmit}>
     <div className= "form-group mb-1 first-class" >
      <label className="col-lg-label align-left font-weight-bold ">Postcode*</label>
        <div className="col-lg-16">
          <input type="text" className="form-control" placeholder="Postcode"
                value= {postcodeVal}
                onChange= {onPostcodeChange}
                required autoFocus >
          </input>
        </div>
    </div>
    <div className="form-group mb-1 first-class">
      <label htmlFor="houseNo" className="col-lg-label align-left font-weight-bold">House No*</label>
        <div className="col-lg-16">
         <input type="text" className="form-control"
            placeholder="House No"
            value={houseVal}
            onChange={onHouseChange}
            required autoFocus >
         </input>
        </div>
      </div>
      <button type="submit"    className= "btn btn-md btn-primary font-weight-bold mt-3"
              name="postcodeButton"
              onClick={onSearchSubmit}
        >Find my Address</button>
     </form>
    </div>
    )
 }

export default PostcodeSearch;
