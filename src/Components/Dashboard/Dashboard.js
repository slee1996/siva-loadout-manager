import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import useCharacters from './useCharacters'
import useEquipment from './useEquipment'
//import useMembershipID from './useMembershipId'

const apiKey = process.env.REACT_APP_API_KEY

const Dashboard = () => {
    let username = 'frogsarepeople2'
    let membershipID = '4611686018450621105'

    let [characters, setCharacters] = useState({})
    let [selectedCharacter, setSelectedCharacter] = useState(undefined)
    let [equipment, setEquipment] = useState({})
    let [toggleMenu, setToggleMenu] = useState(false)
    let [charMenu, setCharMenu] = useState(undefined)

    let [keys, setKeys] = useState([])
    let [charKeys, setCharKeys] = useState([]) //charkeys = 'character keys' (i.e. character object level keys)

    //characters initialized to null value so I can return nothing without breaking errything 
    let [one, setOne] = useState(null) //character one
    let [two, setTwo] = useState(null) //character two
    let [three, setThree] = useState(null) //character three

    let [charOneEquipment, setCharOneEquipment] = useState(null)
    let [charTwoEquipment, setCharTwoEquipment] = useState(null)
    let [charThreeEquipment, setCharThreeEquipment] = useState(null)

    //const memshipID = useMembershipID(membershipID)

    useEffect(() => {
        const source = axios.CancelToken.source()
        const runEffect = async() => {
            try {
                const response = await axios.get(`https://www.bungie.net/Platform/Destiny2/1/Profile/${membershipID}/?components=Profiles,Characters,CharacterEquipment`, {
                    headers: {'X-API-Key': apiKey},
                    cancelToken: source.token
                })
                setCharacters(response.data.Response.characters.data)
                setEquipment(response.data.Response.characterEquipment.data)
            } catch(error) {
                if (axios.isCancel(error)){}
                else {throw error}
            }
        }
        runEffect()
        return () => {
            source.cancel()
        }
    },[characters, equipment])

    useEffect(() => {
        if(characters)
        setKeys(Object.keys(characters))  
    }, [characters])

    useEffect(() => {
        let character

        if(keys[0]){
            character = characters[keys[0]]
            setCharKeys(Object.keys(character))
            if(characters[keys[0]]){
                setOne(characters[keys[0]])
                if(equipment[keys[0]]){setCharOneEquipment(equipment[keys[0]].items)}
            }
            if(characters[keys[1]]){
                setTwo(characters[keys[1]])
                if(equipment[keys[1]]){setCharTwoEquipment(equipment[keys[1]].items)}
            }
            if(characters[keys[2]]){
                setThree(characters[keys[2]])
                if(equipment[keys[2]]){setCharThreeEquipment(equipment[keys[2]].items)}
            }
        }
        else return undefined
    }, [keys])

    //Building Character One
    let charOne = useCharacters(one, charKeys).character  
    let equipOne = useEquipment(charOneEquipment).loadout
    const charCardOne = charOne && equipOne ? 
        <div id='char-card'>
            {console.log(charOne)}
                <div id='characters'>
                    {charOne.race}
                    {charOne.classType}
                    {charOne.light}
                </div>
                <div id='equip-div'>
                    <div id='weapon-div'>
                        <div id='weapon-box'>
                            <img id='image-box' src={equipOne.kinetic.icon} alt={equipOne.kinetic.name} />
                        </div>
                        <div id='weapon-box'>
                            <img id='image-box' src={equipOne.energy.icon} />
                        </div>
                        <div id='weapon-box'>
                            <img id='image-box' src={equipOne.heavy.icon} />
                        </div>
                    </div>
                    <div id='armor-div'>
                        <div id='armor-box'>
                            <img id='image-box' src={equipOne.helmet.icon} />
                        </div>
                        <div id='armor-box'>
                            <img id='image-box' src={equipOne.arms.icon} />
                        </div>
                        <div id='armor-box'>
                            <img id='image-box' src={equipOne.chest.icon} />
                        </div>
                        <div id='armor-box'>
                            <img id='image-box' src={equipOne.legs.icon} />
                        </div>
                        <div id='armor-box'>
                            <img id='image-box' src={equipOne.classItem.icon} />
                        </div>
                    </div>
                </div>
            </div>
        : null

    let charTwo = useCharacters(two, charKeys).character
    let equipTwo = useEquipment(charTwoEquipment).loadout
    const charCardTwo = charTwo && equipTwo ? 
        <div id='char-card'>
                <div id='characters'>
                    {charTwo.race}
                    {charTwo.classType}
                    {charTwo.light}
                </div>
                <div id='equip-div'>
                    <div id='weapon-div'>
                        <div id='weapon-box'>
                            <img id='image-box' src={equipTwo.kinetic.icon} />
                        </div>
                        <div id='weapon-box'>
                            <img id='image-box' src={equipTwo.energy.icon} />
                        </div>
                        <div id='weapon-box'>
                            <img id='image-box' src={equipTwo.heavy.icon} />
                        </div>
                    </div>
                    <div id='armor-div'>
                        <div id='armor-box'>
                            <img id='image-box' src={equipTwo.helmet.icon} />
                        </div>
                        <div id='armor-box'>
                            <img id='image-box' src={equipTwo.arms.icon} />
                        </div>
                        <div id='armor-box'>
                            <img id='image-box' src={equipTwo.chest.icon} />
                        </div>
                        <div id='armor-box'>
                            <img id='image-box' src={equipTwo.legs.icon} />
                        </div>
                        <div id='armor-box'>
                            <img id='image-box' src={equipTwo.classItem.icon} />
                        </div>
                    </div>
                </div>
            </div>
        : null

    let charThree = useCharacters(three, charKeys).character
    let equipThree = useEquipment(charThreeEquipment).loadout
    const charCardThree = charThree && equipThree ? 
        <div id='char-card'>
                <div id='characters'>
                    {charThree.race}
                    {charThree.classType}
                    {charThree.light}
                </div>
                <div id='equip-div'>
                    <div id='weapon-div'>
                        <div id='weapon-box'>
                            <img id='image-box' src={equipThree.kinetic.icon} />
                        </div>
                        <div id='weapon-box'>
                            <img id='image-box' src={equipThree.energy.icon} />
                        </div>
                        <div id='weapon-box'>
                            <img id='image-box' src={equipThree.heavy.icon} />
                        </div>
                    </div>
                    <div id='armor-div'>
                        <div id='armor-box'>
                            <img id='image-box' src={equipThree.helmet.icon} />
                        </div>
                        <div id='armor-box'>
                            <img id='image-box' src={equipThree.arms.icon} />
                        </div>
                        <div id='armor-box'>
                            <img id='image-box' src={equipThree.chest.icon} />
                        </div>
                        <div id='armor-box'>
                            <img id='image-box' src={equipThree.legs.icon} />
                        </div>
                        <div id='armor-box'>
                            <img id='image-box' src={equipThree.classItem.icon} />
                        </div>
                    </div>
                </div>
            </div>
        : null
    
    return(
        <div id='dashboard'>Dashboard Page
            <Link to='/stats'>Stats</Link>
            {two ? 
                <button onClick={() => {
                    setToggleMenu(() => {
                        if(toggleMenu){
                            return false
                        }
                        if(!toggleMenu){
                            return true
                        }
                    })
                }}>
                    Set Character
                </button>
            : null}
            {toggleMenu ? 
                <>menuMap</>
            : null}
            <div id='character-cards-div'>
                {charCardOne}
                {charCardTwo ? 
                    charCardTwo
                : null}
                {charThree ? 
                    charCardThree
                : null}
            </div>
        </div>
    )
}

export default Dashboard