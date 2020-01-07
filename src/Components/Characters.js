import React, { Component } from 'react'



class Characters extends Component {
    render(){
        const keys = this.props.keys
        let charCard
        let characters

        if(keys[0]){
            characters = this.props.characters
            console.log(keys)
            let character = characters[keys[0]]
            charCard = <div key={keys}>what up
                {character.classType}
            </div>
        }

        return(
            <div id='characters'>
                <section id='emblem'>
                    <h4>Character Class</h4>
                    <h4>Light Level</h4>
                </section>
                <div id='char-equipment'>
                    <div id='equipment-box'>
                        <img src='https://cdn.thetrackernetwork.com/destiny/common/destiny2_content/icons/7106d949c81a1b2b281964ae2184d6b2.jpg' id='image-box' />
                        <h6>Spare Rations</h6>
                    </div>
                    <div id='equipment-box'>Energy Weapon</div>
                    <div id='equipment-box'>Heavy Weapon</div>
                    <div id='equipment-box'>Helmet</div>
                    <div id='equipment-box'>Gauntlets</div>
                    <div id='equipment-box'>Chest</div>
                    <div id='equipment-box'>Legs</div>
                    <div id='equipment-box'>Class Item</div>
                </div>
            </div>
        )
    }
}

export default Characters