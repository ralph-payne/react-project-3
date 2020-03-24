import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import AddQuestion from '../questions/AddQuestion';
// import Header from '../layout/Header.jsx';
import HeaderWithLogo from '../layout/HeaderWithLogo';
import SectionNav from '../questions/SectionNav.jsx';
import QuestionPageNumbers from '../layout/QuestionPageNumbers';
import QuestionToolbar from '../questions/QuestionToolbar.jsx';
import QuestionCreator from '../questions/QuestionCreator.jsx';
import DisplayQuestionType from '../questions/DisplayQuestionType.jsx';
import '../../styles/CustomCss.css';

// Import images
import config from '../../images/config.png'
import pen from '../../images/pen.png'
import eye from '../../images/eye.png'
import backward from '../../images/backward.png'


class SurveyDetails extends Component {

    constructor(props){
      super(props);
      this.state = {
        _id: "",
        hasQuestions: false, // <= This will eventually be legacy code
        /* The surveyHasSections boolean is used so that if the value is false, the addQuestion form will not be displayed. This will prevent questions that aren't attached to a section being added to the database.*/
        surveyHasSections: false,
        sectionHasQuestions: false,
        sections: [], // < Is this actually in use?
        questionsFromSelectedSection: [],
        currentSectionObject: {},
        currentQuestionNumber: 1,
        questionTypeSelected: 'Short answer',
        currentQuestionObject: {},
        // currentQuestionNumber: 0, // <= Not currently in use
        title: "",
        description: "",
        editMode: true,
        addQuestionMode: false,
      };
    }

    componentDidMount(){
        this.getSingleSurvey();
        this.getAllSectionsForThisSurvey();
        // this.selectCurrentSectionByPosition(0); // <= Choose the first section of the survey to display
        // this.selectCurrentQuestion(0); // <= Choose the first question of the section to display
    }

    toggleViewOrEdit = (_viewOrEdit) => {

        if (_viewOrEdit === 'view') {
            this.setState({
                editMode: false
            })
        } else {
            this.setState({
                editMode: true
            })
        }
    }

    getSingleSurvey = () => {
        const { params } = this.props.match;
        axios.get(`https://express-project-3.herokuapp.com/api/surveys/${params.id}`)
            .then( responseFromApi => {
                const titleRetrievedFromApi = responseFromApi.data.title;
                const descriptionRetrievedFromApi = responseFromApi.data.description;
                const surveyId = responseFromApi.data._id;
                const sectionsRetrievedFromApi = responseFromApi.data.sections;
                // Retrieve the first section so that the currentSection object can be set. Note, this will only set the section as the first section when you load the survey for the first time. Otherwise, when the user adds a new section, the currentSectionObject will be that new section.
                if (sectionsRetrievedFromApi && this.state.currentSectionObject === {}) {
                    const sectionZero = responseFromApi.data.sections[0];
                    this.setState({
                            currentSectionObject: sectionZero
                        });
                }
                this.setState({
                    _id: surveyId,
                    title: titleRetrievedFromApi,
                    description: descriptionRetrievedFromApi,
                    sections: sectionsRetrievedFromApi
            })})
            .catch(err => console.log(err));
    }

    deleteSurvey = () => {
        const { params } = this.props.match;
        axios.delete(`https://express-project-3.herokuapp.com/api/surveys/${params.id}`)
            .then( () => {
                // this.getAllSectionsForThisSurvey();
                this.props.history.push('/surveys');
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    getAllSectionsForThisSurvey = () => {
        const { params } = this.props.match;
            axios.get(`https://express-project-3.herokuapp.com/api/sectionsBySurveyId/${params.id}`)
                .then(responseFromApi => {
                    if (responseFromApi.data.length !== 0) {
                        this.setState({
                            sections: responseFromApi.data,
                            surveyHasSections: true,
                            // Display the first section
                            currentSectionObject: responseFromApi.data[0]
                        },
                            // Use callback parameter to call getSingleSection function and avoid any issues with async
                            this.getSingleSection(responseFromApi.data[0]._id)
                            // this.selectCurrentSectionByPosition(0) // <= Choose the first section of the survey to display
                            
                        );
                    
                        // console.log(responseFromApi.data);

                    } else {
                        console.log('No Sections found for this survey');
                    }
                    // console.log(responseFromApi.data[0]._id);
                })
                .catch(err => console.log(err));
    }

    getSingleSection = (_sectionId) => {
        axios.get(`https://express-project-3.herokuapp.com/api/sections/${_sectionId}`)
        .then( responseFromApi => {
            this.setState({ surveyHasSections: true })
            // TODO: Make this a ternary operator
            if (responseFromApi.data.questions.length > 0) {
                // console.log(`Found ${responseFromApi.data.questions.length} questions for this section`);
                // console.log(responseFromApi.data.questions);
                this.setState({
                    // Todo: Remove duplicates here (but first check what breaks when you remove 'hasQuestions'
                    hasQuestions: true, // <= legacy code
                    sectionHasQuestions: true,
                    currentQuestionObject: responseFromApi.data.questions[0]
            })} else {
                this.setState({
                    hasQuestions: false, // <= legacy code
                    sectionHasQuestions: false,
                })
            }
            // console.log(responseFromApi.data.questions);
            // console.log(this.state.hasQuestions);
            this.setState({
                questionsFromSelectedSection: responseFromApi.data.questions,
                currentSectionObject: responseFromApi.data,
            })
            // console.log(this.state.questionsFromSelectedSection);
        })
        .catch(err => console.log(err));
    }

    selectCurrentSectionById = (e) => {
        // Extract the ID from the section span
        // console.log(`Selecting current section`);
        const sectionIdFromBtn = e.target.id;
        // Retrieve the details for the section that the user has clicked
        this.getSingleSection(sectionIdFromBtn);
    }

    // Select Current Section by Position
    selectCurrentSectionByPosition = (_position) => {
        const arrayOfSections = this.state.sections;
        console.log(`inside selectCurrentSectionByPosition callback for position ${_position}`);
        console.log(arrayOfSections);
        const sectionSelected = arrayOfSections[_position];
        console.log(sectionSelected);
        // 

        this.setState({
            currentSectionObject: sectionSelected

        },
            // Use callback function to select the first question (and avoid issues with setState being asynchronous)
            // this.selectCurrentQuestion(0)
        )

    }

    /*
    Function which takes in a parameter and displays the question. The parameter can be (a) position in the question array of the question the user wants to display (b) 'first', i.e. the first question in the array (c) 'last', i.e. the last question in the array.
    */

    // Function to control pagination with circle buttons
    changeQuestionWithCircle = (event) => {
        const pageNumberSelectedId = event.target.id;
        this.selectCurrentQuestion(pageNumberSelectedId);
        this.lightUp();
        
        this.setState({
            currentQuestionNumber: pageNumberSelectedId
        })

        // console.log(`Selecting question with array number: ${pageNumberSelectedId}`);
        this.toggleAddQuestionMode(false);
        this.toggleViewOrEdit('view');
    }

    // Function which highlights which question/section/questionType the user is on by performing a check against the id of the span/div and the id or the current question/section/questionType that is in the state
    lightUp = (_id) => {
        // this.state;

        // Destructuring
        const { editMode, questionTypeSelected, currentQuestionObject, currentSectionObject, surveyHasSections } = this.state;

        const currentQusId = currentQuestionObject._id;
        console.log(currentQusId);

    }

    // You also want to input next
    selectCurrentQuestion = (_position) => {
        // console.log(_position);
        const foo = this.state.currentSectionObject;
        // console.log(foo);
        const arrayOfQuestions = this.state.questionsFromSelectedSection;
        // console.log(`Questions from Selected Section`);
        // console.log(arrayOfQuestions);

        // console.log(this.state.currentQuestionNumber);

        // You should look through the arrayOfQuestions and check to see which position the current id is
        /*
        for (let i = 0; i < arrayOfQuestions.length; i ++) {
            let id = arrayOfQuestions[i]._id;
            console.log(id);
            if (this.state.currentQuestionObject._id === arrayOfQuestions[i]._id) {
                console.log('found');
                console.log(i);
                return i;
            } else {
                return false;   
            }
        }
        */

        // Id of the current question
        // const foo = this.state.currentQuestionObject._id;
        // console.log(foo);

        // You want to find out the current position you are in

        if (_position === 'last' ) {
            const finalPage = arrayOfQuestions.length - 1
            const finalQuestion = arrayOfQuestions[finalPage]
            this.setState({
                currentQuestionObject: finalQuestion,
                currentQuestionNumber: finalPage
            })
            console.log('we are now on question number:');
            console.log(this.state.currentQuestionNumber);
        } else if (_position === 'next') {
            console.log(`we are now on question number: ${this.state.currentQuestionNumber}`);
            const currentQuestionNumber = this.state.currentQuestionNumber;
            // You need to convert the response (this.state.currentQuestionNumber) which is a number as a string to a number with parseInt
            // const nextQuestionObject = ;

            const newQuestionNumber = parseInt(currentQuestionNumber) + 1;

            if (newQuestionNumber >= arrayOfQuestions.length) {
                // Go back to the beginning
                // Todo: Advance to next section when this happens
                this.setState({
                    currentQuestionObject: arrayOfQuestions[0],
                    currentQuestionNumber: 0
                })
            } else {
                this.setState({
                    currentQuestionObject: arrayOfQuestions[newQuestionNumber],
                    currentQuestionNumber: newQuestionNumber
                })
            }

        } else if (this.state.questionsFromSelectedSection.length > 0 && _position !== 'last') {
            // console.log(`inside loop: ${_position}`);
            const specificQuestion = arrayOfQuestions[_position];
            // console.log('Selecting a current question');
            // console.log(arrayOfQuestions);
            // console.log(specificQuestion);
            // Remember, setState is asyncrhonous
            this.setState({
                currentQuestionObject: specificQuestion,
            })

            // console.log(`we are now on question number: ${this.state.currentQuestionNumber}`);
        } else {
            console.log('No questions found for this section');
            this.setState({
                currentQuestionObject: {},
                hasQuestions: false
            })

        }
    }

    deleteSection = (_delId) => {
        const idWithDelPrefix = _delId.target.id;
        const sectionIdToDelete = idWithDelPrefix.substring(8);   

        axios.delete(`https://express-project-3.herokuapp.com/api/sections/${sectionIdToDelete}`)
        .then( (data) => {
            this.getSingleSurvey();
            this.getAllSectionsForThisSurvey();
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    deleteQuestion = (_delId) => {
        console.log(_delId);
        const idWithDelPrefix = _delId.target.id;
        const questionIdToDelete = idWithDelPrefix.substring(8);

        axios.delete(`https://express-project-3.herokuapp.com/api/questions/${questionIdToDelete}`)
        .then( (data) => {
            this.getSingleSurvey();
            console.log(this.state.currentSectionObject._id);
            this.selectCurrentSectionById(this.state.currentSectionObject._id);
            this.getAllSectionsForThisSurvey();
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    renderArrayOfSectionDivs() {
    //   console.log(this.state.sections);
        if (this.state.sections) {
            const arrayOfSectionDivs = this.state.sections.map((element, index) => {
                return (
                <span 
                    key={ element._id } 
                    id={`sect-span-${element.sectionTitle}`} 
                    onClick={ e => this.selectCurrentSectionById(e) }> 
                    { element.sectionTitle } 
                    <button id={`del-sec-${element._id}` } onClick={ e => this.deleteSection(e) }>x</button> | 
                </span>
                )
            });
            return arrayOfSectionDivs;
        }
    }

    // Logic for next page / next question
    moveToNextQuestion() {
        console.log('moving to next question');
        // This is the array of questions
        console.log(this.state.questionsFromSelectedSection);
        console.log(this.state.currentQuestionObject);
        this.selectCurrentQuestion('');
        // Include logic that increases the number of questions & if the question is equal to the lenght of the seciton, then you move to the next section
        // If you are on the final quesitno, do nothing.   
    }

    /*
    changeQuestionTypeView is a function that is used to extract the id of the div that the user clicks on. Upon clicking on the div, the view will change. The related components are QuestionToolbar and ToolbarItem.
    */
    changeQuestionTypeView = (event) => {
        const idWithDelPrefix = event.target.id;
        const questionTypeIndex = idWithDelPrefix.substring(8);
        // Todo: This array should be stored elsewhere and imported
        const arrayOfQuestionTypes = [ 'Short answer', 'Paragraph', 'True / False', 'Five-point Scale', 'Seven-point Scale' ];
        const questionTypeValue = arrayOfQuestionTypes[questionTypeIndex]

        this.setState({
            questionTypeSelected: questionTypeValue
        })
        // You also want to make the target div ('active') and the other target divs 'disabled'
    }


    toggleAddQuestionMode = (_boolean) => {
        this.toggleViewOrEdit('edit');
        this.setState({
            addQuestionMode: _boolean
        })
    }

      render() {

        // Destructuring
        const { editMode, questionTypeSelected, currentQuestionObject, currentSectionObject, surveyHasSections } = this.state;

        return (
          <div>
                <HeaderWithLogo title={'Survey Stueff'}/>
                
                {/* Survey Toolbar */}
                <div className="horizontal-text-center survey-toolbar">
                    {/* <h1>{this.state.title}</h1> */}
                    <Fragment>
                        <Link to={'/'}><span className="pad-1 survey-toolbar-icon"><img style={{width: 35, height: 35}} src={backward}/></span></Link>
                        <span className="pad-1 survey-toolbar-icon" onClick={() => this.toggleViewOrEdit('view')}><img style={{width: 35, height: 35}} src={eye}/></span>
                        <span className="pad-1 survey-toolbar-icon" onClick={() => this.toggleViewOrEdit('edit')}><img style={{width: 35, height: 35}} src={pen}/></span>
                        <span className="pad-1 survey-toolbar-icon"><img style={{width: 35, height: 35}} src={config}/></span>
                    </Fragment>
                </div>

                {/* Section Nav allows user to create new sections in edit mode; it also shows the sections in view mode*/}
                <SectionNav
                    editMode={editMode}
                    arrayOfSections={this.state.sections}
                    theSurvey={this.state}
                    surveyHasSections={surveyHasSections}
                    getTheSurvey={this.getSingleSurvey} 
                    getSingleSection={this.getSingleSection}
                    deleteSection={this.deleteSection}
                    selectCurrentSectionById={this.selectCurrentSectionById}
                    renderArrayOfSectionDivs={this.renderArrayOfSectionDivs}
                    currentSectionObject={currentSectionObject}
                    getAllSectionsForThisSurvey={this.getAllSectionsForThisSurvey}
                />

            {/* #For Dev Purposes Only# This just shows what questions have been loaded from the databse */}

            {/* <div>

                { this.state.sectionHasQuestions && 
                    currentSectionObject.questions.map((element, index) => (
                        <div key={index} >
                            id={ element._id } [ Type: { element.questionType } | { element.questionText } | { element.questionDescription } ]
                        </div>
                    ))
                }
            </div> */}

            <div className="horizontal-text-center pad-1-rem">
                
                { currentSectionObject &&
                    <span className="all-capitals survey-section-header">{currentSectionObject.sectionTitle}</span> 
                }



                { !editMode &&
                    <div className="question-text">{currentQuestionObject.questionText}</div> 
                }           

            {/* Question pagination with circles */}
            { currentSectionObject.questions &&
                <Fragment>
                { currentSectionObject.questions.map((element, index) => (
                    <span 
                        id={element._id} 
                        key={index}
                        onClick={this.changeQuestionWithCircle} 
                        className="circle-pagination-button"
                    >
                            <QuestionPageNumbers 
                                ido={index}
                                questionMode={this.state.addQuestionMode} // Todo: Check you can remove this legacy code
                                toggleAddQuestionMode={this.toggleAddQuestionMode}
                                
                            />
                    </span>
                ))}
                </Fragment>
            }

        {/* Add Question button (circle with a plus sign) gets displayed if there is a section that is currently being displayed */}
        {surveyHasSections &&

                <span className="add-btn-symbol" onClick={() => this.toggleAddQuestionMode(true)}>
                    {/* <svg height="30" width="30">
                        <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="3" fill="green"/>
                    </svg> */}

                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 52 52"><path d="M26 0C11.664 0 0 11.663 0 26s11.664 26 26 26 26-11.663 26-26S40.336 0 26 0zm0 50C12.767 50 2 39.233 2 26S12.767 2 26 2s24 10.767 24 24-10.767 24-24 24z"/><path d="M38.5 25H27V14c0-.553-.448-1-1-1s-1 .447-1 1v11H13.5c-.552 0-1 .447-1 1s.448 1 1 1H25v12c0 .553.448 1 1 1s1-.447 1-1V27h11.5c.552 0 1-.447 1-1s-.448-1-1-1z"/></svg>
                </span>               
        }

            </div>

            {editMode &&
                <div className="container-researcher-main">

                    {/* Question Form for researcher to create a new question */}
                    <div className="researcher-left">
                        { this.state.addQuestionMode &&
                        <QuestionCreator
                            editMode={this.state.editMode}
                            questionType={questionTypeSelected}
                            getSingleSurvey={this.getSingleSurvey}
                            getSingleSection={this.getSingleSection}  
                            currentSectionObject={this.state.currentSectionObject}
                            selectCurrentQuestion={this.selectCurrentQuestion}
                        />
                        }




                                {/* Temp commenting out the 'Delete Question' feature} */}

                                {/* <button 
                                    id={`del-que-${currentQuestionObject._id}`} 
                                    onClick={ e => this.deleteQuestion(e) }>
                                        Delete Question
                                </button> */}




                    {this.state.surveyHasSections &&
                        <Fragment>
                            {/* Component which shows the questionType. Within the DisplayQuestionType, you have grandchilden which are components for each type of question */}
                            <div id="question-type-container">
                            <DisplayQuestionType 
                                questionType={questionTypeSelected}
                            />
                            </div>
                        </Fragment>
                    }
                    </div>

                    {this.state.surveyHasSections &&
                        <div className="researcher-right">
                            <QuestionToolbar changeQuestionTypeView={this.changeQuestionTypeView}/>
                        </div>
                    }
                </div>
            }

            {/* --- View Mode --- */}
            {!editMode &&
                <div className="container-researcher-main">

                        <QuestionCreator
                            editMode={this.state.editMode}
                            questionType={questionTypeSelected}
                            getSingleSurvey={this.getSingleSurvey}
                            getSingleSection={this.getSingleSection}  
                            currentSectionObject={this.state.currentSectionObject}
                            selectCurrentQuestion={this.selectCurrentQuestion}
                        />

                    {/* Component which shows the questionType. Within the DisplayQuestionType, you have grandchilden which are components for each type of question */}
                    {this.state.surveyHasSections &&
                        <Fragment>
                            <DisplayQuestionType 
                                questionType={currentQuestionObject.questionType}
                                />
                        </Fragment>
                    }

                </div>
            }

            <div className="center-children">
                { !editMode &&
                    <button className="botao-purple" onClick={() => this.selectCurrentQuestion('next')}>Next</button>
                }
            </div>
          </div>
        )
    }
}

export default SurveyDetails