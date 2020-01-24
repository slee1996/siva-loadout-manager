import { useState, useEffect } from 'react'
const axios = require('axios')

const useCharacters = (membershipID) => {
    let [returnArray, setReturnArray] = useState([])
    let [characters, setCharacters] = useState(undefined)
    let [equipment, setEquipment] = useState(undefined)
    let [returnObj, setReturnObj] = useState(undefined)
    
    useEffect(() => {
        //console.log('what is up')
        const source = axios.CancelToken.source()
        const runEffect = async() => {
            try {
                const response = await axios.get(`http://localhost:4000/api/${membershipID}/characters`,{
                    cancelToken: source.token
                })
                console.log(response)
                const equip = Object.assign({}, response.data.equipment[0].map(i => i["items"]))
                setEquipment(equip)

                const char = Object.assign({}, response.data.characters[0])
                const arr = Array.from(char)
                //console.log(char)
                setCharacters(response.data.characters[0])
            } catch(error) {
                if (axios.isCancel(error)){}
                else {throw error}
            }
        }
        runEffect()
        
        return () => {
            source.cancel()
        }
    },[membershipID])

    useEffect(() => {
        let array = []
        const runEffect = async() => {
            let keys = characters.keys() 
            for(const key of keys){
                let charClass = characters[key].classType === 2 ? 'warlock' : characters[key].classType === 1 ? 'hunter' : 'titan'
                
                const obj = {
                    character: Object.assign({}, characters[key]),
                    equipment: equipment[key].map(i => i)
                }
                array.push(obj)
            }
        }
        if(characters){runEffect()}
        setReturnArray(array.map(i => i))
    },[characters, equipment])

    return(
        {returnArray}
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