import React, { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

const Stats = () => {
    let [stats, setStats] = useState({})
    let [kills, setKills] = useState('')
    let [deaths, setDeaths] = useState('')
    let [dpg, setDPG] = useState('')
    let [assists, setAssists] = useState('')
    let [apg, setAPG] = useState('')
    let [kd, setKD] = useState('')
    let [kda, setKDA] = useState('')
    let [kpg, setKPG] = useState('')
    let [efficiency, setEfficiency] = useState('')
    let [gp, setGP] = useState('')
    let [gw, setGW] = useState('')
    let [wr, setWR] = useState('')
    let [bowKills, setBowKills] = useState('')
    let [sniperKills, setSniperKills] = useState('')

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
        axios.get(`https://www.bungie.net/Platform/Destiny2/${membership}/Account/${playerID}/Stats/`, {headers: {'X-API-Key': apiKey}})
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
            setEfficiency(stats.efficiency[killKeys[1]].displayValue)
            setGP(stats.activitiesEntered[killKeys[1]].value)
            setGW(stats.activitiesWon[killKeys[1]].value)
            setKPG(stats.kills[killKeys[2]].displayValue)
            setAPG(stats.assists[killKeys[2]].displayValue)
            setDPG(stats.deaths[killKeys[2]].displayValue)
            setKDA(stats.killsDeathsAssists[killKeys[1]].displayValue)
        }
        else console.log('nah fam')
    }, [stats])

    useEffect(() => {
        if(gw){
            setWR(((gw / gp) * 100).toFixed(2) + '%')
            console.log(`the win rate is ${wr}`)
        }
    }, [gw])

    return(
        <div id='Stats'> 
            <div id='search-div'>
                <h1>Stat Tracker</h1>
                <input value={name} placeholder='Search Player' onChange={(e) => setName(e.target.value)} />
                <button value={name} onClick={(e) => setPlayer(e.target.value)}>Search</button>
            </div>
            <h1>{player}</h1>
            <div id='total-div'>
                <h3>Stats</h3>
                <div id='kd-div'>
                    <div id='kd-eff'>
                        <h3>Kill/Death Ratio:</h3> 
                        <h3>{kd}</h3>
                        <h3>Efficiency:</h3>
                        <h3>{efficiency}</h3>
                        <h3>KDA Ratio:</h3>
                        <h3>{kda}</h3>
                    </div>
                    <div id='win-div'>
                        <h3>Games Played:</h3>
                        <h3>{gp}</h3>
                        <h3>Games Won:</h3>
                        <h3>{gw}</h3>
                        <h3>Win Rate:</h3>
                        <h3>{wr}</h3>
                    </div>
                </div>
                <div id='stat-div'>
                    <div id='stat-box'>
                        <h3>Kills</h3>
                        <h4>Total Kills:</h4> 
                        <h4>{kills}</h4>
                        <h4>Kills Per Game:</h4>
                        <h4>{kpg}</h4>
                    </div>
                    <div id='stat-box'>
                        <h3>Assists</h3>
                        <h4>Total Assists:</h4> 
                        <h4>{assists}</h4>
                        <h4>Assists Per Game:</h4>
                        <h4>{apg}</h4>
                    </div>
                    <div id='stat-box'>
                        <h3>Deaths</h3>
                        <h4>Total Deaths:</h4> 
                        <h4>{deaths}</h4>
                        <h4>Deaths Per Game:</h4>
                        <h4>{dpg}</h4>
                    </div>
                    <div id='stat-box'>
                        <h3>Precision Weapon Kills</h3>
                        <h4>Bows:</h4> 
                        <h4>{deaths}</h4>
                        <h4>Sniper Rifles:</h4>
                        <h4>{dpg}</h4>
                        <h4>Hand Cannons:</h4>
                        <h4>(hcKills)</h4>
                        <h4>Scout Rifles:</h4>
                        <h4>(srKills)</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats