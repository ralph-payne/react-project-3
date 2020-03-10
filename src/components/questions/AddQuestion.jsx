import React, { Component } from 'react';
import axios from 'axios';
// import Button from '../layout/Button.jsx';

class AddQuestion extends Component {
  constructor(props){
      super(props);
      this.state = { 
          title: "",
          description: "",
          questionType: "Select",
          options: null, 
          isShowing: false
        };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const questionType = this.state.questionType;
    // we need to know to which survey the created task belong, so we need to get its 'id'
    // it has to be the 'id' because we are referencing survey
    // by its id in the task model on the server side ( survey: {type: Schema.Types.ObjectId, ref: 'Survey'})
    const surveyId = this.props.theSurvey._id;
    // console.log(title);
    // { title, description, projectID } => this is 'req.body' that will be received on the server side in this route,
    // so the names have to match
    axios.post("http://localhost:5000/api/questions", { title, description, questionType, surveyId })
    .then( (data) => {
        console.log(data);
          // after submitting the form, retrieve survey one more time so the new task is displayed. Reset the fields for good UX
        this.props.getTheSurvey();
        this.setState({title: "", description: "", questionType: "Select"});
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  toggleForm = () => {
    // this.setState({isShowing: !this.setState.isShowing})
    if(!this.state.isShowing){
      this.setState({isShowing: true});
    } else {
      this.setState({isShowing: false});
    }
  }

  showAddQuestionForm = () => {
    if(this.state.isShowing){
      return (
        <div>
          <h3>Add Question</h3>
          <form onSubmit={e => this.handleFormSubmit(e)}>
          
                <div style={{width:"50%", display:"inline-block"}}>
                    <label>Title:</label>
                    <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
                    <label>Description:</label>
                    <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
                </div>

                <div style={{width:"50%"}}>
                    <label htmlFor="question-type">Question Type</label>
                    <select id="question-type" name="questionType" onChange={ e => this.handleChange(e)} value={this.state.value}>
                        <option value="Select">Select</option>
                        <option value="textBox">Text Box</option>
                        <option value="yesNo">Yes/No Question</option>
                        <option value="dropdown">Dropdown</option>
                        <option value="radio">Radio</option>
                    </select>
                </div>
                <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }

  render() {
        
    return(
      <div>
        <hr />
        <button onClick={() => this.toggleForm()}>Add Question</button>
        { this.showAddQuestionForm() }
        {/* { this.state.isShowing &&  addTaskForm} */}
        <hr/>
        
      </div>
    );
  }
}

export default AddQuestion;
