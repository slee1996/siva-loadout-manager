import React, { useState, useEffect } from 'react'

const useDisplayCharacterCards = (array) => { //rename to displayCharCards
    const bungieUrl = 'https://bungie.net'
    const arr = array
    
    let [charArray, setCharArray] = useState(undefined)
    let [characterSelect, setCharacterSelect] = useState(0)
    let [character, setCharacter] = useState(undefined)
    let [menu, setMenu] = useState(undefined)
    let [weapons, setWeapons] = useState(undefined)
    let [armor, setArmor] = useState(undefined)
    
    useEffect(() => {
        const runEffect = async() => {
            setCharArray(arr)
            console.log('leaving setchararray runeffect')
            return
        }
        runEffect()
    },[arr])

    useEffect(() => {
        const runEffect = async(array) => {
            const menuMap = await array.map((char, i) => (
                <div id='menu-option' key={i} onClick={() => (setCharacterSelect(i))} style={
                    {backgroundImage: 'url(' + bungieUrl + char.character.emblemBackgroundPath + ')',}
                } >
                    <h6>
                        _{char.character.raceType === 2 ? 'exo' : char.character.raceType === 1 ? 'awoken' : 'human'}_{char.character.classType === 2 ? 'warlock' : char.character.classType === 1 ? 'hunter' : 'titan'}_{char.character.light}
                    </h6>
                </div>
            ))
            //charArray.filter(char => char.key = 0)
            setMenu(menuMap)
            
        }
        runEffect(charArray).catch(err => console.log(err))
        
    },[charArray])

    useEffect(() => {
        const runEffect = () => {
            if(charArray){
                setCharacter(charArray[characterSelect])
            }
        }
        runEffect()
    },[characterSelect, charArray])

    useEffect(() => {
        const equipped = character//.equipped
        console.log(character)
        const weaponSort = (e) => {
            console.log(e)
        }
        weaponSort(equipped)
    },[character])

    return(
        <div id='character-cards-div'>
            {character ? 
                <>
                <div id='menu-div'>
                {menu}
                </div>
                    <div id='char-card'>
                        {/* <img src={} alt='' /> */}
                        <div id='race-class-div'>
                            <h1>>></h1>
                            <h1>_{character.character.raceType === 2 ? 'exo' : character.character.raceType === 1 ? 'awoken' : 'human'}</h1>
                            <h1>_{character.character.classType === 2 ? 'warlock' : character.character.classType === 1 ? 'hunter' : 'titan'}</h1>
                            <h1>_{character.character.light}</h1>
                        </div>
                    </div>
                    <div id='equip-div'>
                        <div id='weapon-div'>
                            <h2>_weapons</h2>
                            <div id='weapon-box'>
                                
                            </div>
                        </div>
                        <div id='armor-div'>
                            <h2>_armor</h2>
                            <div id='armor-box'>

                            </div>
                        </div>
                    </div>
                </>
            : 'loading'}
        </div>
    )
}

export default useDisplayCharacterCards