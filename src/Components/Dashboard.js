import React, { Component } from 'react'
import axios from 'axios'
import Characters from './Characters'
import {Link} from 'react-router-dom'

const apiKey = process.env.REACT_APP_API_KEY

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            username: 'frogsarepeople2',
            membershipID: 4611686018450621105,
            player: {},
            characters: {},
            equipment: {}
        }
    }

    async componentDidMount(){
        axios.get("https://cors-anywhere.herokuapp.com/https://www.bungie.net/Platform/Destiny2/1/Profile/4611686018450621105/?components=Profiles,Characters,CharacterEquipment", {headers: {'X-API-Key': apiKey}})
             .then(res => {
                 this.setState({
                        player: res.data.Response,
                        equipment: res.data.Response.characterEquipment.data, 
                        characters: res.data.Response.characters.data
                    })
             })
             .catch(err => console.log(err))
    }

    

    render(){
        let keys = Object.keys(this.state.equipment)
        let characters
        let charKeys

        if(keys[0]){
            characters = this.state.characters
            charKeys = Object.keys(characters[keys[0]])
            console.log(charKeys)
            console.log(keys)
            console.log(characters)
        }

        return(
            <div id='dashboard'>Dashboard Page
                <Link to='/stats'>Stats</Link>
                <Characters characters={characters} keys={keys} charKeys={charKeys} />
                <Characters characters={characters} keys={keys} charKeys={charKeys} />
                <Characters characters={characters} keys={keys} charKeys={charKeys} />
            </div>
        )
    }
}

export default Dashboard