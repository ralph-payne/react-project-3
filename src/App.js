import React, { Fragment, Component } from 'react';
// You import the BrowserRouter and you give it an alias (Router)
// In order to actually use the router, you need to go down to render() and wrap everything in the <Router> tag
// We want to wrap our routes in a Switch so that it shows one at a time
// Next step is creating a new folder in components where you can store the pages
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import About from './components/pages/About';
import CreateSurvey from './components/views/CreateSurvey';
import ViewSurvey from './components/views/ViewSurvey';
import './App.css';

class App extends Component {

    state = {
        loading: false,
        loggedInUser: null
    }

    render() {

    const { loading, loggedInUser } = this.state;

        return (

            <Router>
                <div className='App'>
                    <Navbar />
                        <div className='container'>
                            <Switch>
                                <Route exact path="/create-survey" component={CreateSurvey}/>
                                {/* Eventually, you will have the view-survey route contain the id of the survey */}
                                <Route exact path="/view-survey" component={ViewSurvey}/>
                                <Route exact path='/about' component={About} />
                            </Switch>
                        </div>
                </div>
            </Router>
        )
    }
}

export default App;