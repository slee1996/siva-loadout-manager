import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import useCharacters from './useCharacters'

const apiKey = process.env.REACT_APP_API_KEY

const Dashboard = () => {
    let [username, setUsername] = useState('am'+' '+'frogs')
    let [membershipID, setMemID] = useState('')

    let [player, setPlayer] = useState({})
    let [characters, setCharacters] = useState({})
    let [equipment, setEquipment] = useState({})

    let [keys, setKeys] = useState([])
    let [charKeys, setCharKeys] = useState([]) //charkeys = 'character keys' (i.e. character object level keys)

    //characters initialized to null value so I can return nothing without breaking errything 
    let [one, setOne] = useState(null) 
    let [two, setTwo] = useState(null)
    let [three, setThree] = useState(null)

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
            console.log(characters)
            console.log(keys)
            if(characters[keys[0]]){
                setOne(characters[keys[0]])
            }
            if(characters[keys[1]]){
                setTwo(characters[keys[1]])
            }
            if(characters[keys[2]]){
                setThree(characters[keys[2]])
            }
        }
    }, [keys])

    useEffect(()=> {
        console.log(charKeys)
    },[charKeys])

    return(
        console.log(characters),
        <div id='dashboard'>Dashboard Page
            <Link to='/stats'>Stats</Link>
            <div>Wumbo
                {useCharacters(one, keys, charKeys)}
                {useCharacters(two, keys, charKeys)}
                {useCharacters(three, keys, charKeys)}
            </div>
        </div>
    )
}

export default Dashboard