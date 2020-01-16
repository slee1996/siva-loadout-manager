import { useState, useEffect } from 'react'
import useSetItems from './useSetItems'

const axios = require('axios')
const baseUrl = 'http://localhost:4000/api/'

const useEquipment = (membershipID) => {
    const memberID = membershipID
    
    let [equipment, setEquipment] = useState(undefined)
    let [itemArray, setItemArray] = useState(undefined)
    let [hashArray, setHashArray] = useState(undefined)
    
    useEffect(() => {
        const source = axios.CancelToken.source()
        const runEffect = async() => {
            try {
                const response = await axios.get(`${baseUrl}${memberID}/equipment`,{
                    cancelToken: source.token
                })
                setItemArray(response.data)
                console.log(response.data)
            } catch(error) {
                if (axios.isCancel(error)){}
                else {throw error}
            }
        }
        runEffect()
        return () => {
            source.cancel()
        }
    },[memberID])

    useEffect(() => {
        const runEffect = async(itemArray) => {
            const arr = itemArray.map(
                character => 
                {
                    const items = character.items
                    //items.map(item => console.log(item.itemHash))
                    return items.map(item => item.itemHash)
                }
            )
            setHashArray(arr)
        }
        runEffect(itemArray).catch(err => console.log(err))
    },[itemArray])

    const itemsHashed = useSetItems(hashArray)

    useEffect(() => {
        const runEffect = async() => {
            setEquipment(itemsHashed)
        }
        runEffect()
    },[itemsHashed])

    return(
        //console.log(equipment),
        equipment
    )
}

export default useEquipment