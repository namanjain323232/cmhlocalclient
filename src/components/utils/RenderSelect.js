import React from "react";
const RenderSelect = ({input, label,meta},) => {
    return (
        <div>
            <div className= "form-group mb-0 first-class">
                <div className= "col-lg-12">
                    <select className= "form-control" {...input} />
                  <div className= "text-danger">
                      {meta.touched && meta.error}
                  </div>
                </div>
            </div>
        </div>
    )
}

export default RenderSelect;