import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import useCharacters from './useCharacters'
import useItems from './useItems'

const axios = require('axios')
const baseUrl = 'http://localhost:4000/api/'
const bungieUrl = 'https://bungie.net'

const Dashboard = () => {
    //const username = 'frogsarepeople2'
    const membershipID = '4611686018450621105'
    const charactersArray = useCharacters(membershipID).returnArray
    
    let [bungieUrl] = useState('https://bungie.net')
    
    let [key, setKey] = useState(0) //setting up keys for selecting characters
    let [itemsObj, setItemsObj] = useState(undefined)
    let [charObj, setCharObj] = useState(undefined)

    useEffect(() => {
        console.log(key)
    },[key])

    const menu = charactersArray.map((e, i) => (
        <div id='menu-option' key={i} 
            style={ {backgroundImage: 'url(' + bungieUrl + e["character"].emblemBackgroundPath + ')'}} 
            onClick={() => setKey(i)}
        >
            <h6>_{e["character"].raceType === 2 ? 'exo' : e["character"].raceType === 1 ? 'awoken' : 'human'}_{e["character"].classType === 2 ? 'warlock' : e["character"].classType === 1 ? 'hunter' : 'titan'}_{e["character"].light}</h6>
        </div>
    ))
    
    useEffect(() => {
        const runEffect = () => {
            setCharObj(charactersArray[key])
        }
        runEffect()
    },[charactersArray, key])

    let hashMap = useItems(charactersArray[key])
    console.log(hashMap)
    useEffect(() => {
        const map = hashMap
        const runEffect = (obj) => {
            const objCopy = Object.assign({}, obj)
            if(objCopy && hashMap){
                //console.log(hashMap[0])
                const weapons = hashMap.filter(item => item.itemType === 3)
                const armor = hashMap.filter(item => item.itemType === 2)
                
                // const test = armor.filter(item => item.itemSubType === 30)[0]
                // console.log(test)

                const shellObj = {
                    kinetic: weapons.filter(item => item.equippingBlock.equipmentSlotTypeHash === 1498876634)[0], //1498876634
                    energy: weapons.filter(item => item.equippingBlock.equipmentSlotTypeHash === 2465295065)[0], //2465295065
                    heavy: weapons.filter(item => item.equippingBlock.equipmentSlotTypeHash === 953998645)[0],
                    helmet: armor.filter(item => item.itemTypeDisplayName === "Helmet")[0],
                    gauntlets: armor.filter(item => item.itemTypeDisplayName === "Gauntlets")[0],
                    chest: armor.filter(item => item.itemTypeDisplayName === "Chest"+" "+"Armor")[0],
                    leg: armor.filter(item => item.itemTypeDisplayName === "Leg"+" "+"Armor")[0],
                    classItem: armor.filter(item => item.itemSubType === 30)[0] 
                }
                setItemsObj(shellObj)
            }
        }
        if(hashMap){runEffect(map)}
    },[hashMap])
    
    useEffect(() => {
        console.log(itemsObj)
    },[itemsObj])

    useEffect(() => {
        if(charObj){
            console.log(charObj.character.stats)
            console.log(charObj.character.stats[1943323491])
        }
    },[charObj])

    //style={ {backgroundImage: 'url(' + bungieUrl + e["character"].emblemBackgroundPath + ')'}} 

    return(
        <div id='dashboard'>
            <div id='menu-div'>
                {menu}
            </div>
            {charObj ? 
                <div id="character-cards-div">
                    <div id="char-card"> 
                        {/* style={ {backgroundImage: 'url(' + bungieUrl + charObj.character.emblemPath + ')'}} >  charObj.character.stats[5] */}
                        <img src={bungieUrl + charObj.character.emblemPath} />
                        <div id="race-class-div">
                            _{charObj.character.raceType === 2 ? 'exo' : charObj.character.raceType === 1 ? 'awoken' : 'human'}
                            _{charObj.character.classType === 2 ? 'warlock' : charObj.character.classType === 1 ? 'hunter' : 'titan'}
                            _{charObj.character.light}
                        </div>
                        <div id="stats-div">
                            <h4>Mob: {charObj.character.stats[2996146975]} </h4>
                            <h4>Res: {charObj.character.stats[392767087]} </h4>
                            <h4>Rec: {charObj.character.stats[1943323491]} </h4>
                        </div>
                        <div id="stats-div">
                            <h4>Dis: {charObj.character.stats[392767087]} </h4>
                            <h4>Int: {charObj.character.stats[144602215]} </h4>
                            <h4>Str: {charObj.character.stats[4244567218]} </h4>
                        </div>
                    </div>
                </div> 
            : null}
            {itemsObj ? 
                <div id='equip-div'>
                    <div id='weapon-div'>
                        <div id='weapon-box' style={ {backgroundImage: 'url(' + bungieUrl + itemsObj.kinetic.displayProperties.icon + ')'}} >
                            
                        </div>
                        <div id='weapon-box' style={ {backgroundImage: 'url(' + bungieUrl + itemsObj.energy.displayProperties.icon + ')'}} >
                            
                        </div>
                        <div id='weapon-box' style={ {backgroundImage: 'url(' + bungieUrl + itemsObj.heavy.displayProperties.icon + ')'}} >
                            
                        </div>
                        <button>//set new loadout</button>
                    </div>
                    <div id='armor-div'>
                        <div id='armor-box' style={ {backgroundImage: 'url(' + bungieUrl + itemsObj.helmet.displayProperties.icon + ')'}} >
                            
                        </div>
                        <div id='armor-box' style={ {backgroundImage: 'url(' + bungieUrl + itemsObj.gauntlets.displayProperties.icon + ')'}} >

                        </div>
                        <div id='armor-box' style={ {backgroundImage: 'url(' + bungieUrl + itemsObj.chest.displayProperties.icon + ')'}} >
                            
                        </div>
                        <div id='armor-box' style={ {backgroundImage: 'url(' + bungieUrl + itemsObj.leg.displayProperties.icon + ')'}} >
                            
                        </div>
                        <div id='armor-box' style={ {backgroundImage: 'url(' + bungieUrl + itemsObj.classItem.displayProperties.icon + ')'}} >
                            
                        </div>
                    </div>
                </div>
            : null}
        </div>
    )
}

export default Dashboard