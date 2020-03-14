import React, { Component } from 'react';
import axios from 'axios';
import AddQuestion from '../questions/AddQuestion';
import { Link } from 'react-router-dom';
import Header from '../layout/Header.jsx';
import SectionNav from '../questions/SectionNav.jsx';

class SurveyDetails extends Component {

    constructor(props){
      super(props);
      this.state = {
        _id: "",
        // Perhaps make this questions for all survey?
        questions: [],
        // questionsFromSelectedSection: [],
        sections: [],
        currentSectionObject: {},
        title: "",
        description: "",
        // Current section and current section ID should eventually be together in the same object
        // currentSection: "",
        // currentSectionId: "",
        editMode: true
      };
    }

    componentDidMount(){
        this.getSingleSurvey();
        this.getAllSectionsForThisSurvey();
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
        axios.get(`http://localhost:5000/api/surveys/${params.id}`)
            .then( responseFromApi => {
                const titleRetrievedFromApi = responseFromApi.data.title;
                const descriptionRetrievedFromApi = responseFromApi.data.description;
                const surveyId = responseFromApi.data._id;
                const sectionsRetrievedFromApi = responseFromApi.data.sections;
                // Retrieve the first section so that the currentSection object can be set
                if (sectionsRetrievedFromApi) {
                    const sectionZero = responseFromApi.data.sections[0];
                    this.setState({currentSectionObject: sectionZero});
                }
                this.setState({
                    _id: surveyId,
                    title: titleRetrievedFromApi,
                    description: descriptionRetrievedFromApi,
                    sections: sectionsRetrievedFromApi
            })})
            .catch(err => console.log(err));
    }

    deleteSurvey = () => {
        const { params } = this.props.match;
        axios.delete(`http://localhost:5000/api/surveys/${params.id}`)
            .then( () => {
                // this.getAllSectionsForThisSurvey();
                this.props.history.push('/surveys');
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    getAllSectionsForThisSurvey = () => {
        const { params } = this.props.match;
            axios.get(`http://localhost:5000/api/sectionsBySurveyId/${params.id}`)
                .then(responseFromApi => {
                // console.log(responseFromApi.data);
                    this.setState({
                        sections: responseFromApi.data
                    })
                })
                .catch(err => console.log(err));
    }

    getSingleSection = (_sectionId) => {
        axios.get(`http://localhost:5000/api/sections/${_sectionId}`)
        .then( responseFromApi => {
            this.setState({
                questionsFromSelectedSection: responseFromApi.data.questions,
                currentSectionObject: responseFromApi.data
            })
        })
        .catch(err => console.log(err));
    }

    selectCurrentSection = (e) => {
        const idFromBtn = e.target.firstElementChild.id;
        const sectionIdFromBtn = idFromBtn.substring(8);
        // Display questions for this section by retrieving this particular section from the database
        this.getSingleSection(sectionIdFromBtn);
    }

    deleteSection = (delId) => {
        const idWithDelPrefix = delId.target.id;
        const sectionIdToDelete = idWithDelPrefix.substring(8);   

        axios.delete(`http://localhost:5000/api/sections/${sectionIdToDelete}`)
        .then( (data) => {
            this.getSingleSurvey();
            this.getAllSectionsForThisSurvey();
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    // renderAddQuestionForm = () => {
    // if(!this.state.title){
    //     this.getSingleSurvey();
    //     } else {
    //     // Pass the survey and getSingleSurvey() method as a props down to AddQuestion component
    //     return <AddQuestion 
    //         theSurvey={this.state} 
    //         getTheSurvey={this.getSingleSurvey}
    //         getSingleSection={this.getSingleSection}                
    //         currentSectionObject={this.state.currentSectionObject} />
    // }}

    renderArrayOfQuestionsForCurrentSection() {
        console.log(`trying to render questions`);
        console.log(this.state.currentSectionObject);
        if (this.state.currentSectionObject === undefined || this.state.currentSectionObject === {} ) {
            console.log(`i am undefined`);
            return false
        // } else if (this.state.currentSectionObject.length !== undefined) {
            } else {
            console.log(`I am not undefined. here are my questions`);
            console.log(this.state.currentSectionObject.questions);
            const arrayOfKweks = this.state.currentSectionObject.questions.map((element, index) => {
                return ( 
                <div key= { element._id }>
                    { element._id } [ { element.questionType } | { element.questionText } | { element.questionDescription } ]
                </div>
            )
        });
            return arrayOfKweks;
        }
    }

    renderArrayOfSectionDivs() {
    //   console.log(this.state.sections);
        if (this.state.sections) {
            const arrayOfSectionDivs = this.state.sections.map((element, index) => {
                return (
                <span 
                    key={ element._id } 
                    id={`sect-span-${element.sectionTitle}`} 
                    onClick={ e => this.selectCurrentSection(e) }> 
                    { element.sectionTitle } 
                    <button id={`del-sec-${element._id}` } onClick={ e => this.deleteSection(e) }>x</button> | 
                </span>
                )
            });
            return arrayOfSectionDivs;
        }
    }



      render() {

        return (
          <div>
                <Header title={'Survey Stueff'}/>
                <button id="edit-btn" onClick={() => this.toggleView(true)}>Edit Mode</button>
                <button id="view-btn" onClick={() => this.toggleView(false)}>View Mode</button>
                <button id="config-btn">Config</button>
                <button id="config-btn" onClick={() => this.getAllSectionsForThisSurvey()}>get all sections</button>                
                <button onClick={() => this.deleteSurvey()}>Delete Survey</button>
            <Link to={`/surveys/${this.state._id}/preview`}>Preview Survey</Link>                                             
            <Link to={'/surveys'}>Back to Surveys</Link>

            <h1>{this.state.title}</h1>
            <p>{this.state.description}</p>
            <SectionNav
                editMode={this.state.editMode}
                arrayOfSections={this.state.sections}
                theSurvey={this.state} 
                getTheSurvey={this.getSingleSurvey} 
                getSingleSection={this.getSingleSection}
                deleteSection={this.deleteSection}
                selectCurrentSection={this.selectCurrentSection}
                renderArrayOfSectionDivs={this.renderArrayOfSectionDivs}
                currentSectionObject={this.state.currentSectionObject}
                getAllSectionsForThisSurvey={this.getAllSectionsForThisSurvey}
            />

            {/* <h2>Current Section: {this.state.currentSectionObject.sectionTitle} ({this.state.currentSectionObject._id})</h2> */}

            <hr/>
                <div style={{paddingBottom: 50}}>
                    {/* {this.renderAddQuestionForm()}  */}
                
                <AddQuestion 
                    theSurvey={this.state} 
                    getTheSurvey={this.getSingleSurvey}
                    getSingleSection={this.getSingleSection}                
                    currentSectionObject={this.state.currentSectionObject}/>
                </div>
            <hr/>

            {/* { this.state.currentSectionObject.questions.length > 0 && <h3>Questions</h3> } */}

            <div style={{paddingBottom: 50}}>

                {this.state.currentSectionObject.questions !== undefined &&
                    this.state.currentSectionObject.questions.map((element, index) => (
                        <div key= { element._id }>
                            { element._id } [ { element.questionType } | { element.questionText } | { element.questionDescription } ]
                        </div>
                        ))
                }

            </div>

          </div>
        )
      }
}

export default SurveyDetails