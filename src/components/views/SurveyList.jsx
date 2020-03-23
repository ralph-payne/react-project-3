import React, { Component, Fragment  } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HeaderWithLogo from '../layout/HeaderWithLogo';

import bin from '../../images/bin.png'
import background from '../../images/background.jpg'

class SurveyList extends Component {

    constructor() {
        super();
        this.state = { 
            listOfSurveys: [] 
        };
    }

    getAllSurveys = () => {
        axios.get(`https://express-project-3.herokuapp.com/api/surveys`)
        .then(responseFromApi => {
            // console.log(responseFromApi);
          this.setState({
            listOfSurveys: responseFromApi.data
          })
        });
    }

    deleteSurvey = (delId) => {
        const idWithDelPrefix = delId.target.id;
        console.log(delId);
        const idToDelete = idWithDelPrefix.substring(4);
        console.log(idToDelete);

        // Todo: Add a "Are you sure alert"

        axios.delete(`https://express-project-3.herokuapp.com/api/surveys/${idToDelete}`)
        .then( () => {
            this.props.history.push('/');
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
                    <div className="center-children pad-1" key={survey._id}>
          
                    <span className="pad-1"><Link to={`/surveys/${survey._id}/edit`}>{survey.title}</Link></span>


                    <span className="pad-1 survey-toolbar-icon" onClick={e => this.deleteSurvey(e)}>
                        <img id={`del-${survey._id}`} style={{width: 30, height: 30}} src={bin}/></span>

                    </div>
                );
            });


    
    
        return (
            <Fragment>

                
                
                <div  styles={{ backgroundImage: {background} }}>
                
                <HeaderWithLogo title={'Survey Stueff'}/>

                <div className="center-children pad-top-10">
                    <Link to={'/create-survey'}>
                        <button className="botao-purple">Create New Survey</button>
                    </Link>
                </div>
                </div>
                <div>
                    {arrayOfSurveyDivs}
                </div>
            </Fragment>
        );
      }
}

export default SurveyList;