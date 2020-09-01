import React from "react";


import SignUpForm from "../miniComponents/SignUpForm";
import AuthService from "../AuthService"
import { navigate } from "@reach/router";
import NavBar from "../miniComponents/NavBar";


export default class Inscription extends React.Component{
    constructor(){
        super();
        this.state = {transition: false}
        this.AuthService = new AuthService("api")
    }

    componentDidMount(){
        if(this.AuthService.loggedIn()){
            return window.location.replace("http://localhost:3000")
        }
    }

    render(){
        return(
            <div>
                <NavBar/>
               <SignUpForm/>
            </div>
        )
    }
}