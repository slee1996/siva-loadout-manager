import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import useCharacters from './useCharacters'
import useEquipment from './useEquipment'

const apiKey = process.env.REACT_APP_API_KEY

const Dashboard = () => {
    let [username, setUsername] = useState('frogsarepeople2')
    let [membershipID, setMemID] = useState('')

    let [player, setPlayer] = useState({})
    let [characters, setCharacters] = useState({})
    let [equipment, setEquipment] = useState({})

    let [keys, setKeys] = useState([])
    let [charKeys, setCharKeys] = useState([]) //charkeys = 'character keys' (i.e. character object level keys)

    //characters initialized to null value so I can return nothing without breaking errything 
    let [one, setOne] = useState(null) //character one
    let [two, setTwo] = useState(null) //character two
    let [three, setThree] = useState(null) //character three

    let [charOneEquipment, setCharOneEquipment] = useState(null)
    let [charTwoEquipment, setCharTwoEquipment] = useState(null)
    let [charThreeEquipment, setCharThreeEquipment] = useState(null)

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
        console.log(equipment)
    },[equipment])

    useEffect(() => {
        let character

        if(keys[0]){
            character = characters[keys[0]]
            setCharKeys(Object.keys(character))
            console.log(characters)
            console.log(keys)
            if(characters[keys[0]]){
                setOne(characters[keys[0]])
                if(equipment[keys[0]]){setCharOneEquipment(equipment[keys[0]].items)}
            }
            if(characters[keys[1]]){
                setTwo(characters[keys[1]])
                if(equipment[keys[1]]){setCharTwoEquipment(equipment[keys[1]].items)}
            }
            if(characters[keys[2]]){
                setThree(characters[keys[2]])
                if(equipment[keys[2]]){setCharThreeEquipment(equipment[keys[2]].items)}
            }
        }
        else return undefined
    }, [keys])

    let charCardOne = useCharacters(one, charKeys) 
    let charCardTwo = useCharacters(two, charKeys) 
    let charCardThree = useCharacters(three, charKeys)

    let charEquipOne =  useEquipment(charOneEquipment)
    let charEquipTwo =  useEquipment(charTwoEquipment)
    let charEquipThree =  useEquipment(charThreeEquipment)
    

    //if(charThreeEquipment){console.log(charThreeEquipment)}else{console.log('no')}
    //if(charTwoEquipment){console.log(charTwoEquipment)}else{console.log('no')}
    //if(charOneEquipment){console.log(charOneEquipment)}else{console.log('no')}

    return(
        <div id='dashboard'>Dashboard Page
            <Link to='/stats'>Stats</Link>
            <div>Wumbo
                {charCardOne}
                {charEquipOne}
                {charCardTwo}
                {charEquipTwo}
                {charCardThree}
                {charEquipThree}
            </div>
        </div>
    )
}

export default Dashboard