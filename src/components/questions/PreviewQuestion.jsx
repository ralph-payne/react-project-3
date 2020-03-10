import React, { Component } from 'react';
import axios from 'axios';

class PreviewQuestion extends Component {
    constructor(props){
        super(props);
        this.state = {};
      }

      componentDidMount(){
        this.getTheQuestion();
      }
    
      getTheQuestion = () => {
        const { params } = this.props.match;
        console.log(`preview question`);
        console.log(params.id);
        // axios.get(`http://localhost:5000/api/projects/${params.id}/questions/${params.taskId}`)
        axios.get(`http://localhost:5000/api/questions/${params.id}`)
        .then( responseFromApi =>{
          const theQuestion = responseFromApi.data;
          console.log(theQuestion)
          this.setState(theQuestion);
        })
        .catch(err => console.log(err));
      }

      render() {
        return (
          <div>
            <h1>{this.state.questionText}</h1>
            <p>{this.state.questionType}</p>
          </div>
        );
      }
}


export default PreviewQuestion;
