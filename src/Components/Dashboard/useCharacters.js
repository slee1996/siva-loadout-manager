import React, { useState, useEffect } from 'react'

const useCharacters = (character, charKeys) => {
    let [newKeys, setNewKeys] = useState(undefined) 
    let [newCharacter, setNewCharacter] = useState(undefined)//setting up new character object so that this hook doesn't fire infinitely when called
    //Light Level Definitions
    let [light, setLight] = useState(undefined)

    //Gender Definitions
    let [gender, setGender] = useState(undefined)

    //Character Race Definitions
    let [race, setRace] = useState(undefined)

    //Character Class Definitions
    let [classType, setClassType] = useState(undefined)

    //Emblem Definition
    let [emblem, setEmblem] = useState(undefined)

    //Stats 
    let [stats, setStats] = useState(undefined)
    
    useEffect(() => {
        const runEffect = async() => {
            setNewKeys(charKeys)
            console.log('use characters')
        }
        runEffect()
    },[newKeys])

    useEffect(() => {
        if(character){
            setLight(character[charKeys[6]])
            
            setEmblem(`https://www.bungie.net` + character[charKeys[15]])
            setStats(character[charKeys[7]])

            setGender(() => {
                if(character[charKeys[13]] === 0){return 'male'}
                else return 'female'
            })

            setRace(() => {
                    if(character[charKeys[11]] === 0){return 'human'}
                    if(character[charKeys[11]] === 1){return 'awoken'}
                    if(character[charKeys[11]] === 2){return 'exo'}
                }
            )

            setClassType(() => {
                    if(character[charKeys[12]] === 0){return 'titan'}
                    if(character[charKeys[12]] === 1){return 'hunter'}
                    if(character[charKeys[12]] === 2){return 'warlock'}
                }
            )
        }
    },[newKeys])

    useEffect(() => {
        let statKeys
        if(light || gender || race || classType){
            statKeys = Object.keys(stats)
            
            setNewCharacter({
                race: race,
                classType: classType,
                light: light,
                gender: gender,
                emblem: emblem,
                stats: {
                    intellect: stats[statKeys[0]],
                    resilience: stats[statKeys[1]],
                    discipline: stats[statKeys[2]],
                    light: stats[statKeys[3]],
                    recovery: stats[statKeys[4]],
                    mobility: stats[statKeys[5]],
                    strength: stats[statKeys[6]]
                }
            })
        }
        else return undefined
    },[light, gender, race, classType, emblem, stats])

    useEffect(() => {
        if(newCharacter){
            console.log(newCharacter)
        }
    },[newCharacter])

    return(
        {newCharacter}
    )
}

export default useCharacters