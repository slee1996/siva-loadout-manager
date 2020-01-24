import { useState } from 'react'

const axios = require('axios')
const baseUrl = 'http://localhost:4000/api/'
const returnArray = []

const useSetItems = (array) => {
    let [items, setItems] = useState(undefined)
    
    const buildItems = async(hash) => {
        const abortController = new AbortController()

        const response = await axios.get(baseUrl + `item/` + hash).then(res => res.data).catch(err => console.log(err))
        console.log(response.data)
        returnArray.push(response)

        return () => {
            abortController.abort();
        }
    }

    return(
        items
    )
}

export default useSetItems