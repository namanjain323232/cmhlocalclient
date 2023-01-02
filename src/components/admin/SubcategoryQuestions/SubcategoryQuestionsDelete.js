import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { fetchSubcatQuestion, deleteSubcatQuestion} from "../../../actions/subcatquestions";
import AdminMenu from "../AdminMenu";
import Modal from "../../Modal";
import history from "../../../history";

class SubcategoryQuestionsDelete extends Component {  
  
  componentDidMount() {
    console.log("Props from CDM NNN:", this.props);
    fetchSubcatQuestion(this.props.match.params.id);
  }

  addRoute() {
    return ("/admin/subcatquestions/subcatquestionscreate");
  }

  renderActions() {    
    return (
      <React.Fragment>
       <button onClick= { () => this.props.deleteSubcatQuestion(this.props.match.params.id)} type="submit" className=" btn btn-danger primary-button mr-3">Yes</button> 
      <Link to= "/admin/subcatquestions/subcatquestionslist" type="button" className= "btn btn-secondary primary-button">No</Link>
      </React.Fragment>
     );  
  }
  

  renderContent() {
    if(!this.props.subquestions) {
      return ("Are you sure you want to delete this subcategory questions?");
     }
      return(`Are you sure you want to delete the subcategory questions for: ${this.props.subquestions.subcategory.name}`);  
  }

  render() {
        return (
        <div>

        <div>
          <AdminMenu 
             addRoute = {this.addRoute}
          />
        </div>
         

          <Modal 
            title= "Delete a SubCategory Question"
            content= {this.renderContent()}
            actions= {this.renderActions()}
            onDismiss = {() => history.push("/admin/subcategories/subcategorieslist") }
         /> 

        </div>
        )
    }
}

const mapStateToProps= (state, ownProps) =>
  {
   console.log("State from mapState subcat questions NNN",state);
   console.log("Own props from mapState NNN", ownProps);
   return { subquestions: state.subquestion[ownProps.match.params.id] };
  }

export default connect(mapStateToProps, {fetchSubcatQuestion, deleteSubcatQuestion})(SubcategoryQuestionsDelete);