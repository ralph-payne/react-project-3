import React, { Component } from 'react';
import axios from 'axios';
import HeaderWithLogo from '../layout/HeaderWithLogo';

class CreateSurvey extends Component {
    constructor(props){
        super(props);
        this.state = { 
            title: "", 
            description: "" 
        };
      }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const {title, description} = this.state;
        axios.post("https://express-project-3.herokuapp.com/api/surveys", { title, description })
            .then( () => {
                this.setState({title: "", description: ""});
                this.props.history.push('/');
            })
            .catch( error => console.log(error) );
            }

        handleChange = (event) => {
            const {name, value} = event.target;
            this.setState({[name]: value});
    }

    render(){
        return(



          <div >

            <HeaderWithLogo title={'Survey Stueff'}/>
            <form onSubmit={this.handleFormSubmit}>
                <div id="create-survey-form" className="pad-3-rem">
              <label><span className="strong-header">Title:</span></label>
              <input className="text-area-style" type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
              <label><span className="strong-header">Description:</span></label>
              {/* <textarea name="description" onChange={ e => this.handleChange(e)} /> */}
              <input className="text-area-style" type="text" name="description" value={this.state.description} onChange={ e => this.handleChange(e)}/>
            
                <div className="center-children pad-3-rem">
              <button type="submit" value="Submit" className="botao-purple" >Submit</button>
                    </div>
                    {/* <input type="submit" value="Submit" /> */}
              </div>
            </form>
          </div>
        )
      }
}

export default CreateSurvey;