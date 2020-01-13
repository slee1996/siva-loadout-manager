import React, {useState, useEffect} from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

const useMembershipID = (username) => {
    let [user, setUser] = useState(undefined)
    let [memID, setMemId] = useState(undefined)

    useEffect(() => {
        setUser(username)
    })

    useEffect(() => {
        const runEffect = async() => {
            let membershipID = await axios.get(`https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/All/${username}/`, {headers: {'X-API-Key': apiKey}})
                                          .then(res => res.data.Response[0].membershipId)
                                          //.then(res => console.log(res.data.Response[0].membershipId))
                                          .catch(err => console.log(err))
            setMemId(membershipID)  
                                   
        }
        runEffect()
    },[user])

    if(memID){console.log(memID)} 

    return(memID)
}

export default useMembershipID

// const runEffect = async() => {
//     let characters = await axios.get(`https://www.bungie.net/Platform/Destiny2/1/Profile/${membershipID}/?components=Profiles,Characters,CharacterEquipment`, {headers: {'X-API-Key': apiKey}})
//                                 .then(res => res.data.Response.characters.data)
//                                 .catch(err => console.log(err))
//     let equipment = await axios.get(`https://www.bungie.net/Platform/Destiny2/1/Profile/${membershipID}/?components=Profiles,Characters,CharacterEquipment`, {headers: {'X-API-Key': apiKey}})
//                                .then(res => res.data.Response.characterEquipment.data)
//                                .catch(err => console.log(err))

//     setCharacters(characters)
//     setEquipment(equipment)
// }
// runEffect()