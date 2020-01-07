import React, { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

const Stats = () => {
    let [stats, setStats] = useState({})
    let [kills, setKills] = useState('')
    let [deaths, setDeaths] = useState('')
    let [assists, setAssists] = useState('')
    let [kd, setKD] = useState('')

    let [membership, setMembership] = useState('')
    let [player, setPlayer] = useState('')
    let [playerID, setPlayerID] = useState('')

    const [name, setName] = useState('')

    useEffect(() => {
        axios.get(`https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/All/${name}/`, {headers: {'X-API-Key': apiKey}})
             .then(res => setPlayerID(res.data.Response[0].membershipId))
             .catch(err => console.log(err))
    }, [player])

    useEffect(() => {
        axios.get(`https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/All/${name}/`, {headers: {'X-API-Key': apiKey}})
             .then(res => setMembership(res.data.Response[0].membershipType))
             .catch(err => console.log(err))
    }, [playerID])

    useEffect(() => {
        axios.get(`https://www.bungie.net/Platform//Destiny2/${membership}/Account/${playerID}/Stats/`, {headers: {'X-API-Key': apiKey}})
             .then(res => setStats(res.data.Response.mergedAllCharacters.results.allPvP.allTime))
             .catch(err => console.log(err))
    }, [membership])

    useEffect(() => {
        console.log(player)
        console.log(stats)
        let keys = Object.keys(stats)
        let uKills = stats.kills

        if(keys[0]){
            console.log('keys assigned')
            let killKeys = Object.keys(uKills)

            setKD(stats.killsDeathsRatio[killKeys[1]].displayValue)
            setKills(stats.kills[killKeys[1]].value)
            setDeaths(stats.deaths[killKeys[1]].value)
            setAssists(stats.assists[killKeys[1]].value)
        }
        else console.log('nah fam')
    }, [stats])

    return(
        <div>
            <h1>Stat Tracker</h1>
            <div id='search-div'>
                <input value={name} placeholder='Search Player' onChange={(e) => setName(e.target.value)} />
                <button value={name} onClick={(e) => setPlayer(e.target.value)}>Search</button>
            </div>
            <h1>{player}</h1>
            <div id='total-div'>
                <h3>Stats</h3>
                <div id='stat-div'>
                    <h3>Kill/Death Ratio:</h3> 
                    <h3>{kd}</h3>
                </div>
                <div id='stat-div'>
                    <h3>Kills</h3>
                    <h4>Total Kills:</h4> 
                    <h4>{kills}</h4>
                    <h4>Kills Per Game:</h4>
                </div>
                <div id='stat-div'>
                    <h4>Total Assists:</h4> 
                    <h4>{assists}</h4>
                </div>
                <div id='stat-div'>
                    <h4>Deaths:</h4> 
                    <h4>{deaths}</h4>
                </div>
            </div>
        </div>
    )
}

export default Stats