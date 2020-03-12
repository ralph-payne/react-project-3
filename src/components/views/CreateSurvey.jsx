import React, { Component } from 'react';
import axios from 'axios';

class CreateSurvey extends Component {
    constructor(props){
        super(props);
        this.state = { 
            title: "", 
            description: "" 
        };
      }

    handleFormSubmit = (event) => {
    event.preventDefault();
    const {title, description} = this.state;
    axios.post("http://localhost:5000/api/surveys", { title, description })
        .then( () => {
            // this.props.getData();
            this.setState({title: "", description: ""});
            this.props.history.push('/surveys');
        })
        .catch( error => console.log(error) );
        }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render(){
        return(
          <div>
            <form onSubmit={this.handleFormSubmit}>
              <label>Title:</label>
              <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
              <label>Description:</label>
              <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
    
              <input type="submit" value="Submit" />
            </form>
          </div>
        )
      }
}

export default CreateSurvey;