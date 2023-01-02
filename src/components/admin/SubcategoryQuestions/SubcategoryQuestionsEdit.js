import React, {Component} from "react";
import {connect} from 'react-redux';
import {fetchSubcatQuestion, editSubcatQuestion} from '../../../actions/subcatquestions';
import AdminMenu from "../AdminMenu";

class SubcategoryQuestionsEdit extends Component {

    componentDidMount() {
         this.props.fetchSubcatQuestion(this.props.match.params.id);
    }

    addRoute() {
        return("/admin/subcatquestions/subcatquestionscreate");
       }

    render() {

        return(
            <div>
               <AdminMenu
                 addRoute= {this.addRoute}
               />
                
                <h1> Edit Subcategory Questions</h1>
            </div>
        )
    }
}

const mapStateToProps= (state, ownProps) => {
    console.log("state from subcat question edit PPP");
    return { subquestion: state.subquestions[ownProps.match.params.id] }
}

export default connect(mapStateToProps, {fetchSubcatQuestion, editSubcatQuestion})(SubcategoryQuestionsEdit);