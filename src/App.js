import React, { Component } from 'react';
// You import the BrowserRouter and you give it an alias (Router)
// In order to actually use the router, you need to go down to render() and wrap everything in the <Router> tag
// We want to wrap our routes in a Switch so that it shows one at a time
// Next step is creating a new folder in components where you can store the pages
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import CreateSurvey from './components/views/CreateSurvey';
import ViewSurvey from './components/views/ViewSurvey';
import SurveyList from './components/views/SurveyList';
import SurveyDetails from './components/views/SurveyDetails';
import SurveyConfig from './components/views/SurveyConfig';
import PreviewSurvey from './components/views/PreviewSurvey';
import QuestionDetails from './components/questions/QuestionDetails';
import PreviewQuestion from './components/questions/PreviewQuestion';
import Spinner from './components/layout/Spinner.jsx';
import './App.css';

class App extends Component {

    state = {
        loading: false,
        // Use loggedInUser for Auth
        // loggedInUser: null
    }

    render() {

    const { loading } = this.state;

    if (loading) { 
        return <Spinner />;
    } else {

        return (

            <Router>
                <div className='App'>
                    <Navbar />
                        <div className='container'>
                            <Switch>
                                {/* Create a new survey (Create in CRUD) */}                                
                                <Route exact path="/create-survey" component={CreateSurvey}/>
                                {/* Eventually, you will have the view-survey route contain the id of the survey */}
                                {/* Eventually delete this route */}
                                <Route exact path="/view-survey" component={ViewSurvey}/>
                                {/* List of all surveys */}
                                <Route exact path="/surveys" component={SurveyList}/>
                                {/* Edit or Delete a particular survey (Update and Delete in CRUD) */}                                
                                <Route exact path="/surveys/:id/edit" component={SurveyDetails}/>
                                {/* Preview a survey as a user would (Read in CRUD) */}
                                <Route exact path="/surveys/:id/config" component={SurveyConfig}/>                                
                                <Route exact path="/surveys/:id/preview" component={PreviewSurvey}/>
                                <Route exact path="/questions/:id/edit" component={QuestionDetails}/>
                                <Route exact path="/questions/:id" component={PreviewQuestion}/>  
                                <Route exact path='/about' component={About} />
                            </Switch>
                        </div>
                </div>
            </Router>
            )
        }
    }
}

export default App;