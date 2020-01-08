import React, { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

const useItem = (itemHash) => {
    let [name, setName] = useState('')
    let [icon, setIcon] = useState('')

    useEffect(() => {
        axios.get(`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemHash}/`, {headers: {'X-API-Key': apiKey}})
             .then(res => {
                //console.log(res.data.Response)
                setName(res.data.Response.displayProperties.name)
                setIcon('https://www.bungie.net' + res.data.Response.displayProperties.icon)
            })
             .catch(err => console.log(err))
    })

    // useEffect(() => {
    //     console.log(name)
    //     console.log(icon)
    // }, [name][icon])

    return(
        <div id='item-div'>
            <img src={icon} />
            <h5>{name}</h5>
        </div>
    )
}

export default useItem