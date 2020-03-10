import React, { Component } from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';
import AddSection from '../questions/AddSection'

// import { Link } from 'react-router-dom';

class SectionNav extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            listOfSections: [],
            currentSection: "",
            addSection: true,
            surveyId: ""
        };
    }

      componentDidMount(){
        // const { params } = this.props.match;
        // console.log(params);
        //   console.log(this.props);
        this.setState({
            surveyId: this.props.theSurvey._id,
        });
        // this.getSections2(this.props.surveyId);
        // console.log(`getting sections`);
        // console.log(this.state.listOfSections);
    }


    //   getSections = (_id) => {
    //     // console.log(`looking up data for this survey in Section Nav: ${_id}`);
    //     axios.get(`http://localhost:5000/api/surveys/${_id}`)
    //     .then( responseFromApi => {
    //         // console.log(`Response from the API for the get req of ${_id}`);
    //         // console.log(responseFromApi.data.sections);
    //         this.setState({
    //             listOfSections: responseFromApi.data.sections
    //         })
    //         this.renderArrayOfSections();
    //     })
    //     .catch(err => console.log(err));
    //   }

      renderNewSectionForm = () => {
        if (this.state.addSection) {
            return (
            <AddSection
                theSurvey={this.state} 
                getTheSurvey={this.props.getTheSurvey} 
                {...this.props}
            />);
        }
    }

      renderArrayOfSections() {
        // if (this.state.listOfSections) {
         
            // console.log(this.state.listOfSections);

            const arrayOfSections = this.state.listOfSections.map((element, index) => {
                return <span key={index}>{element} | | </span>
            });

            return arrayOfSections;
        // }
      }

      toggleAddSectionForm() {
           const toggle = this.state.addSection;
           toggle && this.setState({addSection: false});
           !toggle && this.setState({addSection: true});
      }

      render() {

            return (
                <nav className="navbar bg-primary">
                    <h1>
                        
                        {this.props.sectionsDivs}

                    </h1>
                    { this.renderArrayOfSections()}

                    { this.props.editMode && 
                    <h1>
                        <button onClick={() => this.toggleAddSectionForm()}>+ Add Section</button>
                    </h1>
                    }

                    { this.state.addSection &&
                        <AddSection getTheSurvey={this.props.getTheSurvey} surveyId={this.props.surveyId}/>
                    }
                    
                </nav>
            );
        }
}

SectionNav.propTypes = {
    // sections: PropTypes.array.isRequired,
    editMode: PropTypes.bool.isRequired,
    getTheSurvey: PropTypes.func.isRequired,
    theSurvey: PropTypes.object.isRequired
}

export default SectionNav