import React, { Component, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import '../../styles/SectionAndQuestionNav.css';
import tick from '../../images/tick.png'

class QuestionCreator extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            // currentSection: "",
            // addSection: true,
            // surveyId: "",
            questionText: "",
            addQuestion: true,
            questionType: "Select",
            options: null, 
            numberOfOptions: 0,
            questionFormIsShowing: false // << Probably not necessary            
            // sectionDescription: ""
        };
    }

    static propTypes = {
        questionType: PropTypes.string,
    }

    handleChangeAddQuestionText = (event) => {
        this.setState({
            questionText: event.target.value
    })}

    /*
    When a new question is submitted:
    (1) Question is submitted to the database

    */
    handleAddQuestionForm = (event) => {
        event.preventDefault();
        const questionTitle = this.state.questionText;
        console.log(this.state.questionText);
        // const description = this.state.description;
        const questionType = this.props.questionType;
        const sectionId = this.props.currentSectionObject._id;
        console.log(`ques text: ${questionTitle} | ques type: ${questionType} | sec:  ${sectionId} `);
        // we need to know to which survey the created task belong, so we need to get its 'id'. It has to be the 'id' because we are referencing survey
        // By its id in the task model on the server side ( survey: {type: Schema.Types.ObjectId, ref: 'Survey'})
        // const surveyId = this.props.theSurvey._id;
        if ( questionTitle.length > 0 ) {        
        axios.post("https://express-project-3.herokuapp.com/api/questions", 
        { questionTitle, questionType, sectionId })
        .then( (data) => {
              // after submitting the form, retrieve survey one more time so the new task is displayed. Reset the fields for good UX
              this.setState({
                  questionText: ""
                });
                console.log('saved to the db');
            this.props.getSingleSurvey();
            this.props.getSingleSection(sectionId);
            this.props.selectCurrentQuestion('last');
        })
        .catch( error => console.log(error) )
    } else {
        // Todo: Create an alert component and throw an alert if the length of the question title is less than 1
        console.log('throw an alert');
    }        
    }

    render() {

        return (

        <Fragment>

                {/* <span className="display-flex"> */}
            { this.props.editMode &&
                <Fragment>
                <div className="outer-question-box">
                    <div className="new-question-box">                
                    <input type="text"
                    id="new-question-input" 
                    placeholder="New Question..." 
                    name="new-question-input" 
                    value={this.state.questionText} onChange={e => this.handleChangeAddQuestionText(e)}
                    />
                    </div>

                    <div className="tick-icon-frame survey-toolbar-icon" 
                        onClick={this.handleAddQuestionForm}>
                        <img className="tick-icon" style={{width: 30, height: 30}} src={tick}/>
                    </div>
                </div>

                </Fragment>
            }
                {/* </span> */}

        </Fragment>
        )

}
}

QuestionCreator.propTypes = {
    // theSurvey: PropTypes.object.isRequired,
    questionType: PropTypes.string.isRequired,
    getSingleSurvey: PropTypes.func.isRequired,
    getSingleSection: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired,
    currentSectionObject: PropTypes.object,
    selectCurrentQuestion: PropTypes.func.isRequired
}

export default QuestionCreator