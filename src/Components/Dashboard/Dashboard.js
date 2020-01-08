import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import useCharacters from './useCharacters'

const apiKey = process.env.REACT_APP_API_KEY

const Dashboard = () => {
    let [username, setUsername] = useState('frogsarepeople2')
    let [membershipID, setMemID] = useState('')

    let [player, setPlayer] = useState({})
    let [characters, setCharacters] = useState({})
    let [charOne, setCharOne] = useState(null)
    let [charTwo, setCharTwo] = useState(null)
    let [charThree, setCharThree] = useState(null)
    let [equipment, setEquipment] = useState({})

    let [keys, setKeys] = useState([])
    let [charKeys, setCharKeys] = useState([])

    useEffect(() => {
        axios.get(`https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/All/${username}/`, {headers: {'X-API-Key': apiKey}})
             .then(res => setMemID(res.data.Response[0].membershipId))
             .catch(err => console.log(err))
    })

    useEffect(() => {
        axios.get(`https://www.bungie.net/Platform/Destiny2/1/Profile/${membershipID}/?components=Profiles,Characters,CharacterEquipment`, {headers: {'X-API-Key': apiKey}})
             .then(res => {
                 setPlayer(res.data.Response)
                 setCharacters(res.data.Response.characters.data)
                 setEquipment(res.data.Response.characterEquipment.data)
                 console.log('request successful')
                })
             .catch(err => console.log(err))
    },[membershipID])

    useEffect(() => {
        setKeys(Object.keys(characters))
    }, [characters])

    useEffect(() => {
        let character

        if(keys[0]){
            character = characters[keys[0]]
            setCharKeys(Object.keys(character))
            
        }
    }, [keys])

    // useEffect(() => {
    //     keys.forEach(key =>
    //         //console.log(key),
    //         {
    //             setCharacter(
    //                 <div key={key}>
    //                     {characters[key]}
    //                 </div>
    //             )
    //         }
    //     )
    // }, [charKeys])

    return(
        <div id='dashboard'>Dashboard Page
            <Link to='/stats'>Stats</Link>
            <div>Wumbo
                
            </div>
            
        </div>
    )
}

export default Dashboard