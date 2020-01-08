import React, { useState, useEffect } from 'react'
import useItem from './useItem'

const useCharacters = (characters, key, charKeys) => {
    console.log(characters)
    console.log(charKeys)
    let [light, setLight] = useState('')
    let [character, setCharacter] = useState('')
    //Character Race
    let [raceType, setRaceType] = useState('')
    let [race, setRace] = useState('')

    //Character Class
    let [classType, setClassType] = useState('')
    let [charClass, setCharClass] = useState('')

    useEffect(() => {
        setCharacter(characters[key])
    })
    // useEffect(() => {
    //     keys.forEach(
    //         console.log(characters[keys]),
    //         setLight(character[charKeys[6]]),
    //         setRaceType(character[charKeys[11]]),
    //         setClassType(character[charKeys[12]])
    //     ) 
    // }, [keys])

    // useEffect(() => {
    //     if(keys[0] || charKeys[0]){
    //         keys.forEach(key => {
    //             setCharacter(<>{characters[key][charKeys[6]]}</>)
    //         })
    //     }
    // }, [keys][charKeys])
    
    return(
        <div id='characters'>
            {character[charKeys[6]]}
        </div>
    )
}

export default useCharacters