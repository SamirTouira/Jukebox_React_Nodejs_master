import React from "react";
import AuthService from "../AuthService";
import { navigate } from "@reach/router";
import axios from "axios";
import NavBar from "../miniComponents/NavBar";
import AudioPlayer from 'react-custom-audio-player';
import Image from "../song.png";


export default class MainPage extends React.Component {
    constructor() {
        super();
        this.AuthService = new AuthService("api");
        this.state = { user: {}, tracks: [], currentTracks: {}, artist:[] }
        this.renderTracks = this.renderTracks.bind(this);
        this.logout = this.logout.bind(this);
        this.changeCurrentTrack = this.changeCurrentTrack.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.getArtists = this.getArtists.bind(this);
    }



    componentDidMount() {
        if (!this.AuthService.loggedIn()) {
            return window.location.replace("http://localhost:3000/login")
        }

        this.setState({ user: this.AuthService.getProfile() })

        axios.get("http://localhost:4242/api/tracks")
            .then((response) => {
                this.setState({ tracks: response.data })
                this.setState({ artist: response.data })
                console.log(this.state.tracks)

            }).catch(err => console.log(err))
    }


    changeCurrentTrack(ele){
        this.setState({currentTracks: ele});
    }

    getArtists(ele){
        this.setState({artist: ele});
    }

    renderTracks() {
        return this.state.tracks.map((ele, i) => {
            // console.log(ele.name_artist);
            return (
                <div key={i} className={`song__item  ${ele.name == this.state.currentTracks.name ? "isSelected" : ""}`}onClick={() => this.changeCurrentTrack(ele)}>
                    <div  className="song__title" >{ele.name}</div>
                    <div className={`song__artist`}>{ele.name_artist}</div>
                    <div className="song__album"></div>
                    <div className="song__date"></div>
                    <div className="song__duration" style={{left: 50}}>{(ele.duration / 60).toFixed(2).replace(".", ":")}</div>
                </div>
            ) 
            
        })
    }

    logout() {
        this.AuthService.logout();
        return window.location.replace("http://localhost:3000/login");
    }

    handlePlay(e){
        e.target.play();
    }


    render() {
        return (
            <div>
                <NavBar/>
                <div className="col-sm" style={{width:"35%", float:"right", position:"relative", bottom:""}}>
      <img src={Image} style={{width:"400px", marginRight:"200px"}}></img>
    </div>
                <div style={{border:"solid 1px white", width:"600px", marginLeft:"40px", padding:"30px", height:"200px"}}>
                <h2 style={{marginLeft:"50px"}}><p>Bonjour {this.state.user.pseudo} !</p></h2>
                <p style={{marginLeft:"50px"}}>Vous êtes <span style={{color:'#2ABA32'}}>connecté</span> avec l'adresse mail suivante : <b>{this.state.user.email}</b>.</p>
                <button className="btn btn-danger" onClick={this.logout} style={{marginLeft:"50px"}}>Déconnexion</button>
                </div>
                <br/>
                <hr style={{color:"red", height:"0.5px", backgroundColor:"white", boxShadow:"2px 2px 9px 5px rgba(255, 255, 255, 0.3), -0.2em 0 .4em rgba(255, 255, 255, 0.3)"}}/>
                <div className="song__item song__th">
                    <div className="song__like"></div>
                    <div className="song__title"><b>Titre</b></div>
                    <div className="song__title"><b>Artiste</b></div>
                    <div className="song__date"><b>Durée</b></div>
                </div>
                {this.renderTracks()}
                <div className="player">
                    <div className="player__current">
                        <div className="player__photo"></div>
                        <div className="player__song">{this.state.currentTracks.name}</div>
                    </div>
                    <div className="player__menu">
                        <div className="player__control">
                            <audio controls src={this.state.currentTracks.mp3} onCanPlay={this.handlePlay} style={{width:"50rem", position:"relative", right:"40rem"}} />
                        </div>
                    </div>
                    <div className="player__settings">
                        <div className="player__volume"></div>
                    </div>
         </div>
         </div>
        )
    }
}