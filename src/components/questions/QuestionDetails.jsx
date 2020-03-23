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
    console.log(params);
    axios.get(`https://express-project-3.herokuapp.com//api/questions/${params.taskId}`)

    .then( responseFromApi =>{
      const theQuestion = responseFromApi.data;
      this.setState(theQuestion);
      console.log(theQuestion);
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
