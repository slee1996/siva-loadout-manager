import React, { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

const useItem = (hash) => {
    let [itemHash, setHash] = useState(undefined)
    let [itemObj, setItemObj] = useState(undefined)

    let [name, setName] = useState(undefined)
    let [icon, setIcon] = useState(undefined)
    let [stats, setStats] = useState(undefined)

    useEffect(() => {
        setHash(hash)
    })

    useEffect(() => {
        if(itemHash){
        axios.get(`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemHash}/`, {headers: {'X-API-Key': apiKey}})
             .then(res => {
                console.log(res.data.Response)
                setName(res.data.Response.displayProperties.name)
                //setStats(res.data.Response.stats.stats)
                setIcon('https://www.bungie.net' + res.data.Response.displayProperties.icon)
            })
             .catch(err => console.log(err))
        }
    },[itemHash])

    useEffect(() => {
        let item = {
            name: name,
            icon: icon,
            stats
        }
        setItemObj(item)
    },[name, icon, stats])

    return(
        itemObj
    )
}

export default useItem