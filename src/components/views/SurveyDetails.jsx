// Survey Details is the Read part of CRUD

import React, { Component } from 'react';
import axios from 'axios';
// import EditSurvey from './EditSurvey';
import AddQuestion from '../questions/AddQuestion';
import { Link } from 'react-router-dom';
import Header from '../layout/Header.jsx';
// import Toolbar from '../layout/Toolbar.jsx';
import SectionNav from '../layout/SectionNav.jsx';
// import Button from '../layout/Button.jsx';

class SurveyDetails extends Component {

    constructor(props){
      super(props);
      this.state = {
        _id: "",
        section: null,
        questions: [],
        sections: [],        
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

    toggleView = (_editMode) => {
        !_editMode && this.setState({
            editMode: false
        })

        _editMode && this.setState({
            editMode: true
        })
    }

    getSingleSurvey = () => {
        const { params } = this.props.match;
        // console.log(params);
        axios.get(`http://localhost:5000/api/surveys/${params.id}`)
        .then( responseFromApi => {

            const questionsRetrievedFromApi = responseFromApi.data.questions;
            const titleRetrievedFromApi = responseFromApi.data.title;
            const descriptionRetrievedFromApi = responseFromApi.data.description;
            const surveyId = responseFromApi.data._id;
            const sectionsRetrievedFromApi = responseFromApi.data.sections;
            // console.log('Response from API:');
            // console.log(responseFromApi);            
            // console.log('Sections retrieved from API in Survey Details');
            // console.log(sectionsRetrievedFromApi);      
            // console.log('Questions retrieved from API in Survey Details');
            // console.log(questionsRetrievedFromApi);              
            this.setState({
                _id: surveyId,
                questions: questionsRetrievedFromApi,
                title: titleRetrievedFromApi,
                description: descriptionRetrievedFromApi,
                sections: sectionsRetrievedFromApi
            })
        })
        .catch(err => console.log(err));
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

      renderAddQuestionForm = () => {
        if(!this.state.title){
            this.getSingleSurvey();
          } else {
            // pass the survey and getSingleSurvey() method as a props down to AddQuestion component
            return <AddQuestion theSurvey={this.state} getTheSurvey={this.getSingleSurvey} />
        }}
    
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

      renderArrayOfSectionDivs() {
          if (this.state.sections) {
              const arrayOfSectionDivs = this.state.sections.map((element, index) => {
                  return (
                    <span key={ index }> { element.sectionTitle } | </span>
                  )
                });
            return arrayOfSectionDivs;
        }
      }

      render() {

        const { params } = this.props.match;

        return (
          <div>
                <Header title={'Survey Stueff'}/>
                <button id="edit-btn" onClick={() => this.toggleView(true)}>Edit Mode</button>
                <button id="view-btn" onClick={() => this.toggleView(false)}>View Mode</button>
                <button id="config-btn">Config</button>
                <button onClick={() => this.deleteSurvey()}>Delete Survey</button>
            <Link to={`/surveys/${this.state._id}/preview`}>Preview Survey</Link>                                             
            <Link to={'/surveys'}>Back to Surveys</Link>

            <h1>{this.state.title}</h1>
            <p>{this.state.description}</p>
            <SectionNav surveyId={params.id} sectionsDivs={this.renderArrayOfSectionDivs()} editMode={this.state.editMode} theSurvey={this.state} getTheSurvey={this.getSingleSurvey}/>

            <hr/>

            <div style={{paddingBottom: 50}}>{this.renderAddQuestionForm()} </div>
            <hr/>

            { this.state.questions && this.state.questions.length > 0 && <h3>Questions</h3> }
            { this.renderArrayOfQuestionDivs()}

          </div>
        )
      }
}

export default SurveyDetails