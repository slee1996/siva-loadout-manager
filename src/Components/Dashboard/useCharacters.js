import { useState, useEffect } from 'react'
const axios = require('axios')

const useCharacters = (membershipID) => {
    const memberID = membershipID
    
    let [characters, setCharacters] = useState(undefined)
    
    useEffect(() => {
        const source = axios.CancelToken.source()
        const runEffect = async() => {
            try {
                const response = await axios.get(`http://localhost:4000/api/${memberID}/characters`,{
                    cancelToken: source.token
                })
                //console.log(response.data)
                setCharacters(response.data)
            } catch(error) {
                if (axios.isCancel(error)){}
                else {throw error}
            }
        }
        runEffect()
        return () => {
            source.cancel()
        }
    },[memberID])

    return(
        characters
    )
}

export default useCharacters

// useEffect(() => {
    //     if(character){
    //         setLight(character[charKeys[6]])
            
    //         setEmblem(`https://www.bungie.net` + character[charKeys[15]])
    //         setStats(character[charKeys[7]])

    //         setGender(() => {
    //             if(character[charKeys[13]] === 0){return 'male'}
    //             else return 'female'
    //         })

    //         setRace(() => {
    //                 if(character[charKeys[11]] === 0){return 'human'}
    //                 if(character[charKeys[11]] === 1){return 'awoken'}
    //                 if(character[charKeys[11]] === 2){return 'exo'}
    //             }
    //         )

    //         setClassType(() => {
    //                 if(character[charKeys[12]] === 0){return 'titan'}
    //                 if(character[charKeys[12]] === 1){return 'hunter'}
    //                 if(character[charKeys[12]] === 2){return 'warlock'}
    //             }
    //         )
    //     }
    // },[character, charKeys])

    // useEffect(() => {
    //     let statKeys
    //     if(light || gender || race || classType){
    //         statKeys = Object.keys(stats)
            
    //         setNewCharacter({
    //             race: race,
    //             classType: classType,
    //             light: light,
    //             gender: gender,
    //             emblem: emblem,
    //             stats: {
    //                 intellect: stats[statKeys[0]],
    //                 resilience: stats[statKeys[1]],
    //                 discipline: stats[statKeys[2]],
    //                 light: stats[statKeys[3]],
    //                 recovery: stats[statKeys[4]],
    //                 mobility: stats[statKeys[5]],
    //                 strength: stats[statKeys[6]]
    //             }
    //         })
    //     }
    //     else return undefined
    // },[light, gender, race, classType, emblem, stats])

    // useEffect(() => {
    //     if(newCharacter){
    //         console.log(newCharacter)
    //     }
    // },[newCharacter])