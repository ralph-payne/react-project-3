import React, { Component, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import '../../styles/SectionAndQuestionNav.css';
import bin from '../../images/bin.png'
import tick from '../../images/tick.png'
// import AddSection from '../questions/AddSection'
// import { Link } from 'react-router-dom';

class SectionNav extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            currentSection: "",
            addSection: true,
            surveyId: "",
            sectionTitle: "",
            sectionDescription: ""
        };
    }

    static propTypes = {
        editMode: PropTypes.bool.isRequired,
        getTheSurvey: PropTypes.func.isRequired,
        theSurvey: PropTypes.object.isRequired,
        arrayOfSections: PropTypes.array.isRequired,
        getSingleSection: PropTypes.func.isRequired,
        getAllSectionsForThisSurvey: PropTypes.func.isRequired,
        currentSectionObject: PropTypes.object,
        selectCurrentSectionById: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.setState({
            surveyId: this.props.theSurvey._id,
        });
    }

    toggleAddSectionForm() {
        const toggle = this.state.addSection;
        toggle && this.setState({addSection: false});
        !toggle && this.setState({addSection: true});
    }

    handleAddSectionForm = (event) => {
        event.preventDefault();
        const {sectionTitle, sectionDescription} = this.state; // <= Destructure
        const surveyId = this.props.theSurvey._id;
        if ( sectionTitle.length > 0 ) {
            axios.post("https://express-project-3.herokuapp.com/api/sections", { sectionTitle, sectionDescription, surveyId })
                .then( (responseFromApi) => {
                    console.log(`just added this section to the DB: ${responseFromApi.data._id}`);
                    this.setState({sectionTitle: "", sectionDescription: ""});
                    // Set the current section to section that you have just selected. You call a function inside the parent of the parent which changes the current section to the last section
                    this.props.getSingleSection(responseFromApi.data._id);
                    this.props.getTheSurvey();
                })
                .catch( error => console.log(error) )
            } else {
                // Todo: Create an alert component and throw an alert if the length of the section title is less than 1
                console.log('throw an alert');
            }
    } 

    handleChangeAddSectionTitle = (event) => {
        this.setState({
            sectionTitle: event.target.value
    })}

      render() {

            return (
                <Fragment>
                    <div>                  
                        <div className="section-nav">
                            {
                                this.props.arrayOfSections.length > 0 &&
                                this.props.arrayOfSections.map((element, index) => {
                                    return (
                                    <span
                                        key={ element._id } 
                                        id={`sect-span-${element.sectionTitle}`} 
                                        onClick={ e => this.props.selectCurrentSectionById(e) }> 
                                        <span id={ element._id } className="section-heading">{ element.sectionTitle }</span>
                                        {/* <button id={`del-sec-${element._id}` } onClick={ e => this.props.deleteSection(e) }>x</button> */}
                                        {/* <span className="pad-1 survey-toolbar-icon"> */}
                                        { this.props.editMode &&
                                        <span>
                                        <img className="survey-toolbar-icon" id={`del-sec-${element._id}`} onClick={ e => this.props.deleteSection(e) } style={{width: 20, height: 20}} src={bin}/>
                                        </span>
                                        }

                                    </span>
                                    )
                                })
                            }
                        
                            <form className="form-inline" onSubmit={this.handleAddSectionForm}>
                            <span className="display-flex padding-left">
                            { this.props.editMode &&
                                <Fragment>
                                    <input type="text" id="new-section-input" placeholder="New Section" name="new-section-input" 
                                    value={this.state.sectionTitle} onChange={e => this.handleChangeAddSectionTitle(e)}
                                    />
                                    {/* <button type="submit">Submit</button> */}
                                    <span className="pad-1 survey-toolbar-icon" onClick={this.handleAddSectionForm}>
                                        <img style={{width: 30, height: 30}} src={tick}/>
                                    </span>
                                </Fragment>
                            }
                                         
                            {/* { this.props.editMode && 
                                <h4><button onClick={() => this.toggleAddSectionForm()}>+</button></h4>
                            } */}

                            </span>
                            </form>
                            
                        </div>
                    </div>
                </Fragment>
            );
        }
}

export default SectionNav