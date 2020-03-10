import React, { Component } from 'react';
import axios from 'axios';

class QuestionDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getTheQuestion();
  }

  getTheQuestion = () => {
    const { params } = this.props.match;
    console.log(params);
    // axios.get(`http://localhost:5000/api/projects/${params.id}/questions/${params.taskId}`)
    axios.get(`http://localhost:5000/api/questions/${params.taskId}`)

    .then( responseFromApi =>{
      const theQuestion = responseFromApi.data;
      this.setState(theQuestion);
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
      </div>
    );
  }
}

export default QuestionDetails;
