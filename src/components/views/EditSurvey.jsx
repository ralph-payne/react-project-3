import React, { Component } from 'react';
import axios from 'axios';

class EditSurvey extends Component {
  constructor(props){
    super(props);
    this.state = {
        title: this.props.theSurvey.title,
        description: this.props.theSurvey.description
    }
  }

  handleFormSubmit = (event) => {
    const {title, description} = this.state;

    event.preventDefault();

    axios.put(`http://localhost:5000/api/surveys/${this.props.theSurvey._id}`, { title, description })
    .then( () => {
        this.props.getTheSurvey();
        // after submitting the form, redirect to '/surveys'
        this.props.history.push('/surveys');
    })
    .catch( error => console.log(error) )
  }

  handleChangeTitle = (event) => {
    this.setState({
      title:event.target.value
    })
  }

  handleChangeDesc = (event) => {
    this.setState({
      description:event.target.value
    })
  }

  render() {
    return (
      <div>
        <hr/>
        <h3>Edit form</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={e => this.handleChangeTitle(e)}/>
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={e => this.handleChangeDesc(e)} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default EditSurvey;
