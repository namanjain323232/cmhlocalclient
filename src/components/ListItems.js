import React, {useState} from "react";


const ListItems = ({items}) =>
{

    const [ listIndex, setListIndex] = useState(null);

    const onItemClick = (index) =>
    {
        setListIndex(index);
    }

    const renderedItems = items.map((item, index) =>
    {
      const active = ( index === listIndex ? "true" : "false");
      console.log("In the index loop",item,active, index, listIndex);
      return (

       <div key = {item.name} className = "card">
       <div className = "card-header">
       <h2 className="mb-0">
            <button type="button" className="btn btn-link" data-toggle="collapse" data-parent="#myAccordion" data-target="#collapseOne" aria-expanded={active}
              onClick = { () => {
                   onItemClick(index)
               }}
            >{item.name}
            </button>
        </h2>
       </div>

        <div id="collapseOne" className= "collapse" aria-labelledby="headingOne" data-parent="#myAccordion"  aria-expanded={active}>
        <div className = "card-body" >
         <p> {item.desc} </p>
        </div>
        </div>
       </div>
     );
    } );
    return (
      <div  className = "accordion" id="myAccordion">
       {renderedItems}
   </div>
    )
}
export default ListItems;
