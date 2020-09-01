import React from "react";
import LoginForm from "../miniComponents/LoginForm";
import AuthService from "../AuthService";
// import { navigate } from "@reach/router";
import NavBar from "../miniComponents/NavBar";
import { Wave } from 'react-animated-text';

export default class MainPage extends React.Component{
    constructor(){
        super();
        this.AuthService = new AuthService("api");
    }

    componentDidMount(){
        if (this.AuthService.loggedIn()){
           return window.location.replace("http://localhost:3000/login")
        }
        const ExampleOne = () => (
            <Wave text="EXAMPLE TEXT" />
          );
    }


    render(){
        return(
            <div style={{backgroundColor:"#1E1E1E"}}>
                <NavBar/>
                <div id='flip'></div>
                <h2 className="m13" style={{fontSize:"4rem", textAlign:"center", margin:"10px", fontFamily:"Tahoma", textShadow:"#1635C6 1px 0 10px"}}>Découvrez des musiques extra, réalisées par des artistes indépendants !</h2>
                <br></br>
                <LoginForm/>
            </div>
        )
    }
}