import React, { Component } from 'react'
import axios from 'axios'

require('dotenv').config()

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            username: 'frogsarepeople2',
            membershipID: 4611686018450621105,
            player: {},
            equipment: {},
            chars: []
        }
    }

    componentDidMount(){
        axios.get("https://cors-anywhere.herokuapp.com/https://www.bungie.net/Platform/Destiny2/1/Profile/4611686018450621105/?components=Profiles,Characters,CharacterEquipment", {headers: {'X-API-Key': 'c81ffdf4ee3a4e27834df8abe16d6925'}})
             .then(res => {
                 this.setState({player: res.data.Response, equipment: res.data.Response.characterEquipment.data})
             })
             .catch(err => console.log(err))
    }

    render(){
        let keys = Object.keys(this.state.equipment)
        let index = keys[0]
        console.log(index)
        console.log(process.env.NODE_ENV)
        
        // let equipped = this.state.equipment[keys[0]].map((item, i) => (
        //     <div key={i}>
        //         {item}
        //     </div>
        // ))

        return(
            <div id='dashboard'>Dashboard Page
                
            </div>
        )
    }
}

export default Dashboard