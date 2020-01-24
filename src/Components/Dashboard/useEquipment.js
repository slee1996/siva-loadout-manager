import { useState, useEffect } from 'react'

const axios = require('axios')
const baseUrl = 'http://localhost:4000/api/'

const useSetItems = (membershipID) => {
    
    let [equipment, setEquipment] = useState([])
    let [itemsArray, setItemsArray] = useState([])
    let [items, setItems] = useState([])
    let [hashArray, setHashArray] = useState([])
    let [item, setItem] = useState(undefined)
    
    useEffect(() => {
        const source = axios.CancelToken.source()
        const runEffect = async() => {
            try {
                const response = await axios.get(`${baseUrl}${membershipID}/equipment`,{
                    cancelToken: source.token
                })
                console.log(response.data)
                //const equip = Object.assign({}, response.data.equipment[0].map(i => i["items"]))
                //setEquipment(equip)
                setItemsArray(response.data.flatMap(obj => obj["items"]))
                return
            } catch(error) {
                if (axios.isCancel(error)){}
                else {throw error}
            }
        }
        runEffect()
        console.log(itemsArray)
        return () => {
            source.cancel()
        }
    },[membershipID])

    useEffect(() => {
        const source = axios.CancelToken.source()

        const dummyArr = []
        
        const runEffect = async(itemHash) => {
            try {
                const response = await axios.get(baseUrl + `item/` + itemHash,{
                    cancelToken: source.token,
                })
                dummyArr.push(response.data)
            } catch(error) {
                if (axios.isCancel(error)){}
                else {throw error}
            }
        }
        
        const getItems = async(h) => {
            const response = await axios.get(baseUrl + `item/` + h).catch(err => console.log(err))
            let res = response.data
            return res
        }
        itemsArray.map(e => 
            runEffect(e.itemHash)
        )
        
        console.log(dummyArr)
        setEquipment(dummyArr)

        return () => {
            source.cancel()
        }
    },[itemsArray.flatMap(e => e).length])
    console.log(equipment)

    return(
        equipment
    )
}

export default useSetItems