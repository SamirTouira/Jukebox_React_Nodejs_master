import React from "react";
import { navigate } from "@reach/router"
import AuthService from "../AuthService";




export default class LoginForm extends React.Component{
    constructor(){
        super();
        this.AuthService = new AuthService("api");
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {email: "", password: "", error: {}}
    }



    handleSubmit(e){
        e.preventDefault();
        this.AuthService.login(this.state.email, this.state.password, (err) => {
            console.log(err.response.data);
            this.setState({error: err.response.data});
        }).then((res) => {
            if(res !== undefined){
                navigate("/");
            }
        })

    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value});
    }

    render(){
        return(
            
            <div className="container" style={{border:"solid white", borderRadius:"20px", boxShadow:"2px 4px 20px 5px rgba(255, 255, 255, 0.3), -0.4em 0 .4em rgba(255, 255, 255, 0.3)"}}>
                <div className="frame" style={{height: "400px", margin: "10px", padding:"15px"}}>
                   <form onSubmit={this.handleSubmit}>
                        <h1 className="accountSurfeurText" style={{height:"90px"}}>Compte</h1>
                        <hr style={{color:"red", height:"0.5px", backgroundColor:"white", boxShadow:"2px 2px 9px 5px rgba(255, 255, 255, 0.3), -0.2em 0 .4em rgba(255, 255, 255, 0.3)"}}/>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input autoComplete="off" type="text" className="form-control customized" onChange={this.onChange} name="email" id="email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" className="form-control customized" onChange={this.onChange} name="password" id="password"/>
                        </div>
                        <p className="error" style={{color:'red'}}>{this.state.error.email || this.state.error.password || this.state.error.err}</p>
                        <button type="submit" className="btn  btn-primary">Connexion</button>
                    </form>
                    <a className="anchorCustom" href="signup">Pas encore inscrit ?</a>
                </div>
            </div>
        )
    }
}