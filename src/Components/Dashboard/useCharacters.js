import React, { useState, useEffect } from 'react'
import useItem from './useItem'

const useCharacters = (character, keys, charKeys) => {
    let [newKeys, setNewKeys] = useState([]) 
    let [newCharacter, setNewCharacter] = useState(null)//setting up new character object so that this hook doesn't fire infinitely when called
    //Light Level Definitions
    let [light, setLight] = useState('')

    //Gender Definitions
    let [gender, setGender] = useState('')

    //Character Race Definitions
    let [race, setRace] = useState('')

    //Character Class Definitions
    let [classType, setClassType] = useState('')
    
    useEffect(() => {
        setNewKeys(charKeys)
    })

    useEffect(() => {
        if(character){
            setLight(character[charKeys[6]])
            setGender(character[charKeys[13]])

            setRace(() => {
                    if(character[charKeys[11]] === 0){return 'Human'}
                    if(character[charKeys[11]] === 1){return 'Awoken'}
                    if(character[charKeys[11]] === 2){return 'Exo'}
                }
            )

            setClassType(() => {
                if(character[charKeys[12]] === 0){return 'Titan'}
                if(character[charKeys[12]] === 1){return 'Hunter'}
                if(character[charKeys[12]] === 2){return 'Warlock'}
            })
        }
        else return undefined
    },[newKeys])

    useEffect(() => {
        if(light || gender || race || classType){
            setNewCharacter(
                <div id='characters'>
                    {race}
                    {classType}
                    {light}
                </div>
        )}
        else return undefined
    },[light, gender, race, classType])

    return(
        console.log(character),
        <>
            {newCharacter}  
        </>
    )
}

export default useCharacters