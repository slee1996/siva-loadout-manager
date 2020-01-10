import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useItem from './useItem'

const apiKey = process.env.REACT_APP_API_KEY

const useEquipment = (equipment) => {
    let [equipped, setEquipped] = useState(undefined)
    
    //equipment slots
    let [kineticHash, setKineticHash] = useState(undefined)
    let [energyHash, setEnergyHash] = useState(undefined)
    let [heavyHash, setHeavyHash] = useState(undefined)
    let [helmetHash, setHelmetHash] = useState(undefined)
    let [armsHash, setArmsHash] = useState(undefined)
    let [chestHash, setChestHash] = useState(undefined)
    let [legsHash, setLegsHash] = useState(undefined)
    let [classHash, setClassHash] = useState(undefined)

    useEffect(() => {
        setEquipped(equipment);
    })

    useEffect(() => {
        let kineticHash
        let energyHash
        let heavyHash
        let helmetHash
        let armsHash
        let chestHash
        let legsHash
        let classHash

        if(equipped){
            console.log(equipped)
            kineticHash = equipped[0].itemHash
            energyHash = equipped[1].itemHash
            heavyHash = equipped[2].itemHash
            helmetHash = equipped[3].itemHash
            armsHash = equipped[4].itemHash
            chestHash = equipped[5].itemHash
            legsHash = equipped[6].itemHash
            classHash = equipped[7].itemHash
            
            setKineticHash(kineticHash)
            setEnergyHash(energyHash)
            setHeavyHash(heavyHash)
            setHelmetHash(helmetHash)
            setArmsHash(armsHash)
            setChestHash(chestHash)
            setLegsHash(legsHash)
            setClassHash(classHash)
        }
        else return undefined
    }, [equipped])

    let kinetic = useItem(kineticHash)
    let energy = useItem(energyHash)
    let heavy = useItem(heavyHash)
    let helmet = useItem(helmetHash)
    let arms = useItem(armsHash)
    let chest = useItem(chestHash)
    let legs = useItem(legsHash)
    let classItem = useItem(classHash)

    return(
        <div>
            {kinetic ? 
                <>
                    <img src={kinetic.icon} />
                    {kinetic.name}
                </>
            : null}
            {energy ? 
                <>
                    <img src={energy.icon} />
                    {energy.name}
                </> 
            : null}
            {heavy ? 
                <>
                    <img src={heavy.icon} />
                    {heavy.name}
                </> 
            : null}
            {helmet ? 
                <>
                    <img src={helmet.icon} />
                    {helmet.name}
                </> 
            : null}
            {arms ?
                <>
                    <img src={arms.icon}/>
                    {arms.name}
                </>
            : null}
            {chest ?
                <>
                    <img src={chest.icon} />
                    {chest.name}
                </>
            : null}
            {legs ?
                <>
                    <img src={legs.icon} />
                    {legs.name}
                </>
            : null}
            {classItem ?
                <>
                    <img src={classItem.icon} />
                    {classItem.name}
                </>
            : null}
        </div>
        
    )
}

export default useEquipment