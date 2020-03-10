import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner.jsx';
import Header from '../layout/Header.jsx';
import SectionNav from '../layout/SectionNav.jsx';
// import Button from '../layout/Button.jsx';

import YesNoQuestion from '../questions/questionTypes/YesNoQuestion.jsx';
import DropdownQuestion from '../questions/questionTypes/DropdownQuestion.jsx';
import TextBoxQuestion from '../questions/questionTypes/TextBoxQuestion.jsx';
import { Link } from 'react-router-dom';
// import RadioQuestion

class PreviewSurvey extends Component {

    constructor(){
        super();
        this.state = {
            _id: "",
            currentSection: "Current Section",
            listOfQuestions: [],
            surveyHeading: "",
            description: "",
            questionText: "questionText",
            questionType: "",
            listOfOptions: [],
            loading: false,
            editMode: false
        };
    }

    getAllQuestions = () => {
        this.setState( { loading: true } );
        const { params } = this.props.match;
        axios.get(`http://localhost:5000/api/surveys/${params.id}`)
        .then( responseFromApi => {
            const heading = responseFromApi.data.title;
            const questions = responseFromApi.data.questions;
            const description = responseFromApi.data.description;
            this.setState({
                listOfQuestions: questions,
                surveyHeading: heading,
                description: description,
                loading: false
            })
        })
        .catch(err => console.log(err));
    }
        
      componentDidMount() {
        this.getAllQuestions();
     }

      render(){

        const { loading, surveyHeading, description, listOfQuestions, currentSection, questionText } = this.state;
        
        if (loading) { 
            return <Spinner />;
        } else {
    
        return(
          <div>
                <Header title={'Survey Stueff'}/>
                <SectionNav sections={['Sec1', 'Sec2']}/>
                <Link to={'/surveys'}>Back to Surveys</Link>
              <h1>{surveyHeading}</h1>
              <small>{description}</small>
              <h1>{currentSection}</h1>
              <h2>{questionText}</h2>
            <div>
                {/* Add Conditional Rendering which only runs this function if questions.length > 0. */}
                    { listOfQuestions.map( element => {

                        if (element.questionType === 'textBox') {
                            return (
                                <TextBoxQuestion _id={element._id} questionText={element.questionText}/>
                            )
                        }

                        else if (element.questionType === 'yesNo') {
                            return (
                                <YesNoQuestion _id={element._id} questionText={element.questionText}/>
                            )
                        }

                        else if (element.questionType === 'dropdown') {
                            return (
                                <DropdownQuestion _id={element._id} questionText={element.questionText} options={['op1', 'op2', 'op3']}/>
                            )
                        }

                        else if (element.questionType === 'radio') {
                            return (
                                <div key={element._id}>
                                    <h3>{element.text}{element.questionText}</h3>
                                </div>
                            )
                        }

                        else {

                            return (
                                <div>
                                    {/* Todo - figure out a way to catch any invalid questions */}
                                    <h3>Invalid Question Type (temp text)</h3>
                                </div>
                            )
                        }

                    })
                    }
            </div>
          </div>
    
            )
        }
      }

}

export default PreviewSurvey;