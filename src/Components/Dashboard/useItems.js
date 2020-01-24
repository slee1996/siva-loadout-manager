import { useState, useEffect } from 'react'

const axios = require('axios')
const baseUrl = 'http://localhost:4000/api/'
let dummyArr = []

const useItems = (array) => {
    let arr = Object.assign({}, array)

    let [hashArray, setHash] = useState(undefined)
    
    let [items, setItems] = useState(undefined)

    useEffect(() => {
        const runEffect = () => {
            setHash(arr["equipment"])
        }
        runEffect()
    },[arr])

    useEffect(() => {
        const source = axios.CancelToken.source()
        const map = arr["equipment"]
        const shellArr = []
        //if(hashArray){console.log(hashArray.map(i => i.itemHash))}

        const runEffect = async(hash) => {
            try {
                const response = await axios.get(baseUrl + 'item/' + hash,{
                    cancelToken: source.token
                })
                const pushObj = Object.assign({}, response.data)
                //console.log(pushObj)
                dummyArr.push(pushObj)
                shellArr.push(pushObj)
                if(shellArr.length >= 16){setItems(shellArr.map(i => i))}
            } catch(error) {
                if (axios.isCancel(error)){}
                else {throw error}
            }
        }
        if(hashArray){
            hashArray.map(i => runEffect(i.itemHash))
        }
        
        return () => {
            source.cancel()
        }
    },[hashArray])

    if(items){console.log(items[0])}

    return(
        items
    )
}

export default useItems