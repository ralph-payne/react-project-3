/*





You should use the SurveyDetails page for the moment

I'm keeping this page as it is useful for the different question types















*/















// import React, { Component } from 'react';
// import axios from 'axios';
// import Spinner from '../layout/Spinner.jsx';
// import Header from '../layout/Header.jsx';
// import Button from '../layout/Button.jsx';
// // import { Link } from 'react-router-dom';

// class ViewSurvey extends Component {

//     constructor(){
//         super();
//         this.state = { 
//             listOfQuestions: [],
//             surveyHeading: "",
//             description: "",
//             loading: false
//         };
//     }

//     getAllQuestions = () => {
//         this.setState( { loading: true } );
//         // Temporarily hardcode the ID 
//         const id = '5e639431d9145f0344fdfd53';
//         axios.get(`http://localhost:5000/api/surveys/${id}`)
//         .then( responseFromApi => {
//             const heading = responseFromApi.data.title;
//             const questions = responseFromApi.data.questions;
//             const description = responseFromApi.data.description;
//             this.setState({
//                 listOfQuestions: questions,
//                 surveyHeading: heading,
//                 description: description,
//                 loading: false
//             })
//         })
//         .catch(err => console.log(err));
//     }
        
//       componentDidMount() {
//         this.getAllQuestions();
//      }

//      deleteSurvey = () => {
//         const { params } = this.props.match;
//         console.log(params);
//         // params will look something like: {id: "5e616de1baac6128546c3129"}
//         axios.delete(`http://localhost:5000/api/surveys/${params.id}`)
//         .then( () => {
//             this.props.history.push('/surveys'); // !!!
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
//     }   

//       render(){

//         const { loading, surveyHeading, description, listOfQuestions } = this.state;
        
//         if (loading) { 
//             return <Spinner />;
//         } else {
    
//         return(
//           <div>

//               <h1>{surveyHeading}</h1>
//                 <Header title={'Survey Stuff'}/>
//                 <Button text={'Next2'}/>
//               <small>{description}</small>
//             <div>
//                 {/* Add Conditional Rendering which only runs this function if questions.length > 0. */}
//                     { listOfQuestions.map( element => {

//                         if (element.questionType === 'textBox') {
//                             return (
//                                 <tr id={element._id}>
//                                     <td>{element.questionText}</td>
//                                     <td>
//                                         <input type="text" value={this.state.title} />
//                                     </td>
//                                 </tr>
//                             )
//                         }

//                         else if (element.questionType === 'yesNo') {
//                             return (
//                                 <div key={element._id}>

//                                     <label htmlFor="yes_no_radio">{element.questionText}</label>
//                                         <input type="radio" name="yes_no">Yes</input>
//                                         <input type="radio" name="yes_no">No</input>

//                                 </div>
//                             )
//                         }

//                         else if (element.questionType === 'dropdown') {
//                             return (
//                                 <div key={element._id}>
//                                     <label htmlFor="question-type">{element.questionText}</label>
//                                         <select id="question-type" name="questionType">
//                                             <option value="Select">Select</option>
//                                             <option value="option-1">Option 1</option>
//                                             <option value="option-2">Option 2</option>
//                                             <option value="option-3">Option 3</option>
//                                             <option value="option-4">Option 4</option>
//                                         </select>
//                                 </div>
//                             )
//                         }

//                         else if (element.questionType === 'radio') {
//                             return (
//                                 <div key={element._id}>
//                                     <h3>{element.text}{element.questionText}</h3>
//                                 </div>
//                             )
//                         }

//                         else {

//                             return (
//                                 <div>
//                                     {/* Todo - figure out a way to catch any invalid questions */}
//                                     <h3>Invalid Question Type (temp text)</h3>
//                                 </div>
//                             )
//                         }

//                     })
//                     }
//             </div>
//           </div>
    
//             )
//         }
//       }

// }

// export default ViewSurvey;