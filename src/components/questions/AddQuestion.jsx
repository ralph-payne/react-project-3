import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import AddOption from './AddOption.jsx';
// import Button from '../layout/Button.jsx';

class AddQuestion extends Component {

  constructor(props){
      super(props);
      this.state = { 
          title: "",
          description: "",
          questionType: "Select",
          options: null, 
          questionFormIsShowing: false
        };
  }

  handleQuestionFormSubmit = (event) => {
    event.preventDefault();
    const questionTitle = this.state.title;
    const description = this.state.description;
    const questionType = this.state.questionType;
    const sectionId = this.props.currentSectionObject._id;
    // we need to know to which survey the created task belong, so we need to get its 'id'. It has to be the 'id' because we are referencing survey
    // By its id in the task model on the server side ( survey: {type: Schema.Types.ObjectId, ref: 'Survey'})
    // const surveyId = this.props.theSurvey._id;
    axios.post("http://localhost:5000/api/questions", 
    { questionTitle, description, questionType, sectionId })
    .then( (data) => {

          // after submitting the form, retrieve survey one more time so the new task is displayed. Reset the fields for good UX
        this.props.getTheSurvey();
        this.props.getSingleSection(sectionId);        
        this.setState({title: "", description: ""});
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  toggleQuestionForm = () => {
    if(!this.state.questionFormIsShowing){
      this.setState({questionFormIsShowing: true});
    } else {
      this.setState({questionFormIsShowing: false});
    }
  }

  toolbarOptionSelected = (e) => {
    const idOfQuestionTypeSelected = e.target.id;
    // console.log(idOfQuestionTypeSelected);
    this.setState(
        {questionType: idOfQuestionTypeSelected}
    );
  }

  showOptions = () => {
    // console.log(this.state);
        if (this.state.questionType === "dropdownOption" || this.state.questionType === "radio") {
            // console.log('dropdown or radio selected');
            return <AddOption addQuestionState={this.state} getTheSurvey={this.props.getTheSurvey}/>
        }
            return false;
    }

  showAddQuestionForm = () => {
    if(this.state.questionFormIsShowing){
      return (
        <div>
          <div>
            <form onSubmit={ e => this.handleQuestionFormSubmit(e)}>
                <h2>{this.state.questionType}</h2>
                <div style={{width:"50%", display:"inline-block"}}>
                    <label>Question Text:</label>
                    <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
                    <label>Description:</label>
                    <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
                    <button onClick={() => this.showOptions()}>Add Option</button>
                    <div>{this.showOptions()} </div>
                </div>

                <div style={{width:"50%", display:"inline-block"}}>
                    <ul>
                        <div id="textBoxOption" onClick={(e) => this.toolbarOptionSelected(e)}>Text Box</div>
                        <div id="yesNoOption" onClick={(e) => this.toolbarOptionSelected(e)}>Yes/No Question</div>
                        <div id="dropdownOption" onClick={(e) => this.toolbarOptionSelected(e)}>Dropdown</div>
                        <div id="radioOption" onClick={(e) => this.toolbarOptionSelected(e)}>Radio</div>
                    </ul>
                </div>
                <input type="submit" value="Submit" />

            </form>
          </div>
        </div>
      );
    }
  }



  render() {
        
    return(
      <div>
        <hr/>
        <button onClick={() => this.toggleQuestionForm()}>Add Question</button>
        { this.showAddQuestionForm() }
        <hr/>
      </div>
    );
  }
}

AddQuestion.propTypes = {
    theSurvey: PropTypes.object.isRequired,
    getTheSurvey: PropTypes.func.isRequired,
    getSingleSection: PropTypes.func.isRequired,
    currentSectionObject: PropTypes.object,
}

export default AddQuestion;