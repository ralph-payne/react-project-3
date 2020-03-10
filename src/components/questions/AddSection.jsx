import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class AddSection extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            sectionTitle: "",
            sectionDescription: ""
        };
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const {sectionTitle, sectionDescription} = this.state;
        const surveyId = this.props.surveyId;
        // console.log(`title: ${sectionTitle}`);
        // console.log(`section description: ${sectionDescription}`);
        // console.log(`survey ID: ${surveyId}`);
        axios.post("http://localhost:5000/api/sections", { sectionTitle, sectionDescription, surveyId })
        .then( (data) => {
            // console.log(data);
            this.setState({sectionTitle: "", sectionDescription: ""});
            this.props.getTheSurvey();
        })
        .catch( error => console.log(error) )
      }    

    handleChangeTitle = (event) => {
        this.setState({
            sectionTitle: event.target.value
        })
        }
    
    handleChangeDescription = (event) => {
        this.setState({
            sectionDescription: event.target.value
        })
    }    

    render() {
        return (
          <div>
            <hr/>
            <h3>Add Section</h3>
            <form onSubmit={this.handleFormSubmit}>
              <label>Section Title:</label>
              <input type="text" name="title" value={this.state.sectionTitle} onChange={e => this.handleChangeTitle(e)}/>
              <label>Section Description:</label>
              <textarea name="description" value={this.state.sectionDescription} onChange={e => this.handleChangeDescription(e)} />
              <input type="submit" value="Submit" />
            </form>
          </div>
    )}
}

AddSection.propTypes = {
    getTheSurvey: PropTypes.func.isRequired,
}

export default AddSection