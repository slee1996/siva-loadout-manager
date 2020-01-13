import { useState, useEffect } from 'react'
import useItem from './useItem'

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
        const runEffect = async() => {
            let equip = await equipment
            setEquipped(equip)
        }
        runEffect()
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
            //console.log(equipped)
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

    const kinetic = useItem(kineticHash)
    const energy = useItem(energyHash)
    const heavy = useItem(heavyHash)
    const helmet = useItem(helmetHash)
    const arms = useItem(armsHash)
    const chest = useItem(chestHash)
    const legs = useItem(legsHash)
    const classItem = useItem(classHash)

    const loadout = {
        kinetic: kinetic,
        energy: energy,
        heavy: heavy,
        helmet: helmet,
        arms: arms,
        chest: chest,
        legs: legs,
        classItem: classItem
    }

    return(
        {loadout}
    )
}

export default useEquipment