import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
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
            const {sectionTitle, sectionDescription} = this.state;
            const surveyId = this.props.theSurvey._id;
            axios.post("http://localhost:5000/api/sections", { sectionTitle, sectionDescription, surveyId })
            .then( (responseFromApi) => {
                console.log(`just added this section to the DB: ${responseFromApi.data._id}`);
                this.setState({sectionTitle: "", sectionDescription: ""});
                // Set the current section to section that you have just selected
                // You want to call a function inside the parent of the parent which changes the current section to the last section

                this.props.getSingleSection(responseFromApi.data._id);
                this.props.getTheSurvey();
            })
            .catch( error => console.log(error) )
          }         

        handleChangeAddSectionTitle = (event) => {
            this.setState({
                sectionTitle: event.target.value
        })}
    
        handleChangeAddSectionDescription = (event) => {
            this.setState({
                sectionDescription: event.target.value
        })} 

      render() {

            return (
                <nav className="navbar bg-primary">
                    {/* Displays the sections in a heading */}
                    <h1>{this.props.sectionsDivs}</h1>

                    { this.props.editMode && <h1><button onClick={() => this.toggleAddSectionForm()}>+ Add Section</button></h1>}

                    { this.state.addSection &&

                        <div>
                        <hr/>
                        <h3>Add Section</h3>
                        <form onSubmit={this.handleAddSectionForm}>
                        <label>Section Title:</label>
                        <input type="text" name="title" value={this.state.sectionTitle} onChange={e => this.handleChangeAddSectionTitle(e)}/>
                        <label>Section Description:</label>
                        <textarea name="description" value={this.state.sectionDescription} onChange={e => this.handleChangeAddSectionDescription(e)} />
                        <input type="submit" value="Submit" />
                        </form>
                        </div>

                    }
                    
                </nav>
            );
        }
}

SectionNav.propTypes = {
    editMode: PropTypes.bool.isRequired,
    getTheSurvey: PropTypes.func.isRequired,
    theSurvey: PropTypes.object.isRequired,
    sectionsDivs: PropTypes.array.isRequired,
    currentSection: PropTypes.string.isRequired,
    currentSectionId: PropTypes.string.isRequired,
    getSingleSection: PropTypes.func.isRequired
}

export default SectionNav