import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class Loadouts extends Component {
    constructor(){
        super()
        this.state = {
            loadouts: [],
            membershipId: '4611686018450621105'
        }
    }

    getLoadouts = async() => {
        const loadouts = await axios.get(`http://localhost:4000/api/${this.state.membershipId}/loadouts`).then(res => {
            this.setState({loadouts: res.data})
        })
        .catch(err => console.log(err))
        if(loadouts){console.log(loadouts[0])}
    }

    deleteLoadout = (e) => {
        console.log(e.target.value)
        axios.delete(`http://localhost:4000/api/${this.state.membershipId}/loadouts/${e.target.value}`).then(() =>  
            {this.getLoadouts()
        }).catch(err => console.log(err));
    }

    componentDidMount(){
        this.getLoadouts()
    }

    render(){
        //console.log(this.props)
        //console.log(this.state.loadouts[0])
        const loadouts = this.state.loadouts.map((loadout, i) => (
            <div id='lower-div' key={i}>
                <section id='lower-loadout' >
                    <h4  id='weapon-slot'   >{loadout.kinetic}  </h4>
                    <h4  id='weapon-slot'   >{loadout.energy}   </h4>
                    <h4  id='weapon-slot'   >{loadout.heavy}    </h4>
                </section>
                <button value={loadout.loadout_id} onClick= {(e) => this.deleteLoadout(e)} > Delete Loadout</button>
            </div>
            ))

        return(
            <div id='loadouts-div'>Loadout Component
                {loadouts}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToProps)(Loadouts)