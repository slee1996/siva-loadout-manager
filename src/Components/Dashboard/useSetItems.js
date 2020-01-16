import { useState, useEffect } from 'react'

const axios = require('axios')
const baseUrl = 'http://localhost:4000/api/'
const returnArray = []

const setItemsArray = (array) => {
    let arr = array
    let dummyArr = []

    const buildItem = async(hash) => {
        const abortController = new AbortController()

        const response = await axios.get(baseUrl + `item/` + hash).then(res => res.data).catch(err => console.log(err))
        //console.log(response)
        dummyArr.push(response)

        return () => {
            abortController.abort();
        }
    }

    arr.map(hash => buildItem(hash))
    returnArray.push(dummyArr)
}

const useSetItems = (array) => {
    let arr = array
    let [items, setItems] = useState(undefined)
    
    useEffect(() => {
        if(arr){arr.map(
            array => {
                const equipment = setItemsArray(array)
                setItems(returnArray)
                return equipment
            }
        )}
    },[arr])

    return(
        items
    )
}

export default useSetItems