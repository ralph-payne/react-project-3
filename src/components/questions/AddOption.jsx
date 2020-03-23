import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class AddOption extends Component {

    constructor(props){
        super(props);
        this.state = { 
            optionTitle: "",
            optionDescription: ""
        };
    }

    handleOptionFormSubmit = (event) => {
        event.preventDefault();
        const title = this.state.title;
        const description = this.state.description;
        const questionType = this.state.questionType;
        const surveyId = this.props.theSurvey._id;

        axios.post("https://express-project-3.herokuapp.com/api/options", { title, description, questionType, surveyId })
            .then( (data) => {
                console.log(data);
                // after submitting the form, retrieve survey one more time so the new task is displayed. Reset the fields for good UX
                this.props.getTheSurvey();
                this.setState({title: "", description: "", questionType: "Select"});
            })
            .catch( error => console.log(error) )
    }

    showOptionInputs = ( ) => {

    }

    render() {

        return (
            <div>
            <hr/>
                <label>Option {this.props.numberOfOptions + 1}:</label>
                <textarea name="option" value={this.state.description} onChange={ e => this.handleChange(e)} />
                <button>Add Option</button>
            <hr/>
          </div>
        )
    
    }
}

AddOption.propTypes = {
    addQuestionState: PropTypes.object.isRequired,
    getTheSurvey: PropTypes.func.isRequired,
    getOptions: PropTypes.func.isRequired,
    numberOfOptions: PropTypes.number
}

export default AddOption;