import { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

const useItem = (hash) => {
    let [itemHash, setHash] = useState(undefined)
    let [itemObj, setItemObj] = useState(undefined)

    useEffect(() => {
        const runEffect = async() => {
            setHash(hash)
        }
        runEffect()
    })

    useEffect(() => {
        const source = axios.CancelToken.source()
        const runEffect = async() => {
            try {
                const response = await axios.get(`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemHash}/`, {
                    headers: {'X-API-Key': apiKey},
                    cancelToken: source.token
                })
                setItemObj({
                    name: response.data.Response.displayProperties.name,
                    icon: 'https://www.bungie.net' + response.data.Response.displayProperties.icon,
                    stats: response.data.Response.stats.stats
                })
            } catch(error) {
                if (axios.isCancel(error)){}
                else {throw error}
            }
        }
        runEffect()
        return () => {
            source.cancel()
        }
    },[itemObj, itemHash])

    return(
        {itemObj}
    )
}

export default useItem