import React, { Component } from 'react'

class Bmr extends Component {
    constructor(){
        super();
        this.state={
            gender:'',
            weight:'',
            age:'',
            heightFeet:'',
            heightInches:'',
            activity:'',
            bmr:'',
            error:'',
        }
    }
    handleAgeChange=(event)=>{
        this.setState(
            {
                age:event.target.value
            }
        )
    }
    handleWeightChange=(event)=>{
        this.setState(
            {
                weight:event.target.value
            }
        )
    }
    handleheightFeetChange=(event)=>{
        this.setState(
            {
                heightFeet:event.target.value
            }
        )
    }
    handleheightInchesChange=(event)=>{
        this.setState(
            {
                heightInches:event.target.value
            }
        )
    }
    handlegenderChange=(event)=>{
        this.setState(
            {
                gender:event.target.value
            }
        )
    }
    handleTypeChange=(event)=>{
        this.setState(
            {
                type:event.target.value
            }
        )
    }
    handleActivityChange=(event)=>{
        this.setState(
            {
                activity:event.target.value
            }
        )
    }
    calculateBMR(){
        let age=this.state.age;
        let gender=this.state.gender;
        let heightFeet=this.state.heightFeet;
        let heightInches=this.state.heightInches;
        let weight=this.state.weight;
     
        if(age =='' || gender =='' || heightFeet =='' || heightInches =='' || weight=='' ){
            console.log(this.state.age);
            console.log(this.state.weight);
            console.log(this.state.heightInches);
            console.log(this.state.heightFeet);
            console.log(this.state.gender);
            this.setState({
                error:'All fields are required to fill this field'
               
            })
            return
        }
    
       
        let bmrCalc='';
        let height=((heightFeet * 30.48)+(heightInches*2.54));
        if(this.state.type==="Imperial"){
            if(gender==2){
             bmrCalc=66+(6.2 * weight)+(12.7 * height)-(6.76 * age);
       }    else if(gender==1){
            bmrCalc=655.1+(4.35 * weight)+(4.7 * height)-(4.7 * age);
        
        
       
       } 
    }else if(this.state.type==="Metric"){
           if(gender==2){
            bmrCalc= 66.5 + ( 13.75 *weight ) + ( 5.003 * heightFeet) -( 6.755 * age);
           }
         else if(gender==1){
            bmrCalc =  655 + ( 9.563 * weight) + ( 1.850 * heightFeet ) - ( 4.676 *age );
       }
    }
       this.setState({
           bmr:bmrCalc
       });
        this.setState({
            error:''})
}



    calculateCalories(){
        let activity=this.state.activity;
        let calories='';
        if(activity==="1.2"){
           calories= this.state.bmr* 1.2;

        }if(activity==="1.375"){
            calories= this.state.bmr* 1.375;
        }if(activity==="1.55"){
            calories= this.state.bmr* 1.55;
        } if(activity==="1.725"){
            calories=this.state.bmr* 1.725;
        } if(activity==="1.9"){
            calories=this.state.bmr* 1.9;
        }
        this.setState({
            calResult:calories
        })

    }
    
    render() {
        let error;
        let activityForm;
        if(this.state.error){
            error=<div className="error">{this.state.error}</div>
        }
        let resultBMR;
        let resultCalorie;
        let form;
        if(this.state.activity){
            resultCalorie=<div className="result">{this.state.calResult}</div>
        }
        if(this.state.bmr){
            resultBMR= <div className="result">{this.state.bmr}</div>
            activityForm=     <div className="workout">
            <div className="inputwrap">
                <label className="label">Workout in a Week</label>
                <select className="activity" value={this.state.activity} onChange={this.handleActivityChange} name="activity">
                    <option value="">Select your Activity</option>
                    <option value="1.2">Sedntary (Very little or no exercise, and desk job)</option>
                    <option value="1.375">Lightly Active (Light exercise 1 to 3 days per week)</option>
                    <option value="1.55">Moderately Active (Moderate exercise 3 to 5 days per week)</option>
                    <option value="1.725">Very Active (Heavy exercise 6 to 7 days per week)</option>
                    <option value="1.9">Extremely Active (Very intense exercise, and physical job, exercise multiple times per day)</option>
                </select>
            </div>
            
            <button type="button" onClick={()=>this.calculateCalories()}>Calculate Calories</button>
            {resultCalorie}
        </div>
        
        }
        if(this.state.type==="Imperial"){
          form=<div className="form">
          <h2>BMR &amp; Daily Calorie Calculator</h2>
          {error}
          
          <div className="inputwrap">
              <label className="label">Gender</label><label>
                  <input type="radio" checked={this.state.gender ==="1"} onChange={this.handlegenderChange}className="genderF" name="gender" value="1" />Female</label>
                  <label><input type="radio" checked={this.state.gender ==="2"} onChange={this.handlegenderChange} className="genderM" name="gender" value="2" />Male</label>
          </div>
          <div className="inputwrap">
              <label className="label">Weight in Pounds</label>
              <input type="number"onChange={this.handleWeightChange} name="weight" className="weight" min="0" max="999" />
          </div>
          <div className="inputwrap">
              <label className="label">Height in feet and inches</label>
              <input type="number" onChange={this.handleheightFeetChange} name="heightFeet" className="heightFeet" min="0" max="8" />
              <input type="number" onChange={this.handleheightInchesChange}name="heightInches" className="heightInches" min="0" max="11" />
          </div>
          <div className="inputwrap">
              <label className="label">Age in years</label>
              <input type="number" onChange={this.handleAgeChange} className="age" name="age" min="0" max="120" />
          </div>
          {resultBMR}
          <button type="button" onClick={()=>this.calculateBMR()}>Calculate BMR</button>
          {activityForm}
      </div>
  

        }else if(this.state.type==="Metric"){
            form=<div className="form">
                    <h2>BMR Metric &amp; Daily Calorie Calculator</h2>
                    {error}
                    
                  

                    <div className="inputwrap">
                        <label className="label">Gender</label><label>
                            <input type="radio" checked={this.state.gender ==="1"} onChange={this.handlegenderChange}className="genderF" name="gender" value="1" />Female</label>
                            <label><input type="radio" checked={this.state.gender ==="2"} onChange={this.handlegenderChange} className="genderM" name="gender" value="2" />Male</label>
                    </div>
                    <div className="inputwrap">
                        <label className="label">Weight in kgs</label>
                        <input type="number"onChange={this.handleWeightChange} name="weight" className="weight" min="0" max="999" />
                    </div>
                    <div className="inputwrap">
                        <label className="label">Height in cm</label>
                        <input type="number" onChange={this.handleheightFeetChange} name="heightFeet" className="heightFeet" min="0" max="8" />
                        {/* <input type="number" onChange={this.handleheightInchesChange}name="heightInches" className="heightInches" min="0" max="11" /> */}
                    </div>
                    <div className="inputwrap">
                        <label className="label">Age in years</label>
                        <input type="number" onChange={this.handleAgeChange} className="age" name="age" min="0" max="120" />
                    </div>
                    {resultBMR}
                    <button type="button" onClick={()=>this.calculateBMR()}>Calculate BMR</button>
                    {activityForm}
                </div>
            

        }
       
       return(
                <div className="inputwrap">
                <label className="label">Select Type:</label>
                <select className="activity" value={this.state.type} onChange={this.handleTypeChange} name="type">
                    <option value="">Select BMR Type</option>
                    <option value="Imperial">Imperial</option>
                    <option value="Metric">Metric</option>
                    
                </select>
                
                {form}
                </div>
            
            

        );
       }}
export default Bmr;
