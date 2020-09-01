import React from 'react';
import './App.css';


//Router

import {Router, Link } from "@reach/router";


//Screens

import MainPage from "./screens/MainPage";
import Inscription from "./screens/Inscription";
import Login from "./screens/Login";

export default class App extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="App">
                <Router>
                    <Login path="login"/>
                    <Inscription path="signup"/>
                    <MainPage path="/"/>
                </Router>
            </div>
        )
    }
}