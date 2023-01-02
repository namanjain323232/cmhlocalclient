import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {

 return ReactDOM.createPortal(
 <div className= "container">
 <div className= "row">
 <div className= "col-md-12">
  <div onClick= { props.onDismiss} className= "modal-fade" tabIndex= "-1" role= "dialog" >
  <div onClick= { (e) => e.stopPropagation() } className= "modal-dialog modal-dialog-centered" role="document">
  <div className= "modal-content">
   <div className= "modal-header">
    <h4 className= "modal-title font-weight-bold text-align-center">{props.title}</h4>
   </div>
   <div className="modal-body">
      <h5>{props.content}</h5>
   </div>
   <div className="modal-footer" >
     { props.actions}
    </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>, document.querySelector("#modal")
 )
}

export default Modal;