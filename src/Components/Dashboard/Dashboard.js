import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import useCharacters from './useCharacters'
import useEquipment from './useEquipment'
import useCards from './useDisplayCharacterCards'

const Dashboard = () => {
    //const username = 'frogsarepeople2'
    const membershipID = '4611686018450621105'
    const charactersArray = useCharacters(membershipID)
    const equipmentArray = useEquipment(membershipID)
    
    let [keys, setKeys] = useState([])
    let [charKeys, setCharKeys] = useState([]) //charkeys = 'character keys' (i.e. character object level keys)

    let [characters, setCharacters] = useState(undefined)
    let [characterObjArray, setCharObjArray] = useState(undefined)
    let [selectedCharacter, setSelectedCharacter] = useState(undefined)
    let [toggleMenu, setToggleMenu] = useState(false)
    let [charMenu, setCharMenu] = useState(undefined)

    //characters initialized to null value so I can return nothing without breaking errything 
    let [one, setOne] = useState(null) //character one
    let [two, setTwo] = useState(null) //character two
    let [three, setThree] = useState(null) //character three

    let [equipment, setEquipment] = useState(undefined)
    let [charCards, setCharCards] = useState(undefined)
    
    setCharCards = (array) => {
        const buildCard = (obj) => {
            const character = obj.character
            const equipment = obj.equipment
            console.log(character)
            console.log(equipment)
        }
        array.map(key => {
            buildCard(key)
        })
    }

    useEffect(() => {
        const runEffect = async(equipmentArray) => {
            console.log(equipmentArray)
            const arr = await equipmentArray
            //const test = Array.from(equipmentArray)
            //console.log(test[0])
        }
        runEffect(equipmentArray)
        setEquipment(equipmentArray)
        setCharacters(charactersArray)
    },[equipmentArray])

    useEffect(() => {
        if(equipment){
            setKeys(Object.keys(equipment))
            console.log(equipment)
        }
        else console.log('wumbo')
    },[equipment])

    useEffect(() => {
        if(equipment && characters){
            //console.log(equipmentArray[keys[0]])
            //console.log(equipmentArray[keys[1]])
            //console.log(equipmentArray[keys[2]])
            //console.log(equipment[0])
            const charObjArray = []

            const charObjBuilder = (char, equip) => {
                const characterObj = {
                    character: char,
                    equipped: equip
                }
                //console.log(characterObj)
                return(
                    characterObj
                ) 
            }

            Object.keys(characters).forEach(key => {
                    const char = charObjBuilder(
                        characters[key],
                        equipment[key]
                    )
                    charObjArray.push(char)
                    
                }
            )
            setCharObjArray(charObjArray)
        }
        
    },[equipment, characters])

    useEffect(() => {
        console.log(characterObjArray)
    }, [characterObjArray])

    return(
        <div id='dashboard'>Dashboard Page
            <Link to='/stats'>Stats</Link>
            {useCards(characterObjArray)}
        </div>
    )
}

export default Dashboard