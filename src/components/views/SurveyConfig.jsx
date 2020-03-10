import React, { Component } from 'react';
import axios from 'axios';
// import Spinner from '../layout/Spinner.jsx';
import Header from '../layout/Header.jsx';

import EditSurvey from './EditSurvey';
import { Link } from 'react-router-dom';

class SurveyConfig extends Component {

    constructor(props){
      super(props);
      this.state = {
        _id: "",
        section: null,
        questions: [],
        title: "",
        description: "",
        currentSection: "",
        questionTest: "",
        editMode: true
      };
    }

    componentDidMount(){
        this.getSingleSurvey();
    }

    getSingleSurvey = () => {
        const { params } = this.props.match;
        axios.get(`http://localhost:5000/api/surveys/${params.id}`)
        .then( responseFromApi => {
            // The response from the API will return the title, the description and an array of questions
            const questionsRetrievedFromApi = responseFromApi.data.questions;
            const titleRetrievedFromApi = responseFromApi.data.title;
            const descriptionRetrievedFromApi = responseFromApi.data.description;
            const surveyId = responseFromApi.data._id;
            this.setState({
                _id: surveyId,
                questions: questionsRetrievedFromApi,
                title: titleRetrievedFromApi,
                description: descriptionRetrievedFromApi
            })
        })
        .catch(err => console.log(err));
    }

    editSurveyDetails = () => {
        this.setState({
            editMode: true
        })
    }

    renderEditForm = () => {
        if(!this.state.title){
            this.getSingleSurvey();
        } else if (this.state.editMode) {
        //   {...props} => so we can have 'this.props.history' in Edit.js                                                                                     |
            return (
            <EditSurvey 
                theSurvey={this.state} 
                getTheSurvey={this.getSingleSurvey} 
                {...this.props}
            />);
        } else {
            // console.log('do nothing');
        }
    }

    deleteSurvey = () => {
        const { params } = this.props.match;
        axios.delete(`http://localhost:5000/api/surveys/${params.id}`)
        .then( () => {
            this.props.history.push('/surveys');
        })
        .catch((err)=>{
            console.log(err)
        })
    }      
    
      renderArrayOfQuestionDivs() {
        if (this.state.questions) {
          const arrayOfQuestionDivs = this.state.questions.map((element, index) => {
            return (
              <div key={ index }>
                <Link to={`/questions/${element._id}`}>
                  { element.questionText } [{ element.questionType }]
                </Link>
              </div>
            )
          });
          return arrayOfQuestionDivs;
        }
      }

      render() {

        return (
          <div>
                <Header title={'Survey Stueff'}/>                                         
            <h1>{this.state.title}</h1>
            <p>{this.state.description}</p>
            {/* show the heading only if there are questions */}
            
            <div>{this.renderEditForm()} </div>
            <button onClick={() => this.editSurveyDetails()}>Edit Survey Details</button>
            <hr/>
            {/* You should think about how you want to display the preview survey page */}
            <Link to={`/surveys/${this.state._id}/preview`}>Preview Survey</Link>
            <hr/>
            <button onClick={() => this.deleteSurvey()}>Delete Survey</button>
            <hr/>

            <hr/>
            <Link to={'/surveys'}>Back to Surveys</Link>

            { this.state.questions && this.state.questions.length > 0 && <h3>Questions</h3> }
            { this.renderArrayOfQuestionDivs()}

          </div>
        )
      }
}

export default SurveyConfig