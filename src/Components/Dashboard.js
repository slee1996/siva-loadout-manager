import React, { Component } from 'react'
import axios from 'axios'
import Stats from './Stats'
const bungieURL = 'https://cors-anywhere.herokuapp.com/www.bungie.net/Platform'

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            username: 'frogsarepeople2',
            membershipID: 4611686018450621105,
            player:  {
                kd: 0
            },
            apiKey: 'c81ffdf4ee3a4e27834df8abe16d6925'
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount(){
        let username = this.state.username
        console.log(this.state.username)

        axios.get(`${bungieURL}/Destiny2/SearchDestinyPlayer/All/${username}/`,{headers: {'Access-Control-Allow-Origin': 'https://bungie.net', 'X-API-Key': this.state.apiKey }})
            .then(res => {
                this.setState({membershipID: res.data.Response[0].membershipId})
                axios.get(`${bungieURL}/Destiny2/1/Account/${res.data.Response[0].membershipId}/Stats/`,{headers: {'Access-Control-Allow-Origin': 'https://bungie.net', 'X-API-Key': this.state.apiKey }})
                    .then(res => {
                        console.log(res.data)
                        this.setState({player: res.data.Response.mergedAllCharacters.results.allPvP.allTime})
                })
            })
            .catch(err => console.log(err))
    }

    searchPlayer = () => {
        let username = this.state.username
        console.log(this.state.username)
        axios.get(`${bungieURL}/Destiny2/SearchDestinyPlayer/All/${username}/`,{headers: {'Access-Control-Allow-Origin': 'https://bungie.net', 'X-API-Key': this.state.apiKey }})
            .then(res => {
                this.setState({membershipID: res.data.Response[0].membershipId})
                axios.get(`${bungieURL}/Destiny2/1/Account/${res.data.Response[0].membershipId}/Stats/`,{headers: {'Access-Control-Allow-Origin': 'https://bungie.net', 'X-API-Key': this.state.apiKey }})
                    .then(res => {
                        console.log(res.data.Response.mergedAllCharacters.results.allPvP.allTime)
                        this.setState({kd: res.data.Response.mergedAllCharacters.results.allPvP.allTime.killsDeathsRatio.basic.displayValue})
                })
            })
            .catch(err => console.log(err))
    }
    
    render(){
        
        return(
            <div id='dashboard'>Dashboard Page
                <label>
                    Search Player: 
                    <input placeholder='Enter username/gamertag' name='username' onChange={this.handleInput} />
                </label>
                <button onClick={this.searchPlayer} >Search</button>
                <Stats player={this.state.player} />
            </div>
        )
    }
}

export default Dashboard