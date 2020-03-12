import React, { Component, Fragment  } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class SurveyList extends Component {

    constructor() {
        super();
        this.state = { 
            listOfSurveys: [] 
        };
    }

    getAllSurveys = () => {
        axios.get(`http://localhost:5000/api/surveys`)
        .then(responseFromApi => {
            // console.log(responseFromApi);
          this.setState({
            listOfSurveys: responseFromApi.data
          })
        });
    }

    deleteSurvey = (delId) => {
        const idWithDelPrefix = delId.target.id;
        const idToDelete = idWithDelPrefix.substring(4);

        axios.delete(`http://localhost:5000/api/surveys/${idToDelete}`)
        .then( () => {
            this.props.history.push('/surveys');
            this.getAllSurveys();
        })
        .catch((err)=>{
            console.log(err)
        })
    } 

    componentDidMount() {
        this.getAllSurveys();
    }

    render() {

        const arrayOfSurveyDivs =
            this.state.listOfSurveys.map(survey => {
                return (
                    <div key={survey._id}>
                    <span>{survey.title}</span>

                    <span><Link to={`/surveys/${survey._id}/preview`}>Preview</Link></span>             
                    <span><Link to={`/surveys/${survey._id}/edit`}>Edit</Link></span>
                    {/* <button onClick={this.deleteSurvey(survey._id)}>Delete</button> */}
                    <button id={`del-${survey._id}`} onClick={e => this.deleteSurvey(e)}>Delete</button>
                    <span><Link to={`/surveys/${survey._id}/config`}>Config</Link></span>
                    </div>
                );
            });
    
    
        return (
            <Fragment>
                <div>
                <Link to={'/create-survey'}>Create New Survey</Link>
                </div>
                <div>
                    {arrayOfSurveyDivs}
                </div>
            </Fragment>
        );
      }
}

export default SurveyList;