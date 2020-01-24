import React, { useState, useEffect } from 'react'
import useCharacters from './useCharacters'
import useEquipment from './useEquipment'

const useDisplayCharacter = (character) => { //rename to displayCharCards
    const bungieUrl = 'https://bungie.net'
    const membershipID = '4611686018450621105'
    
    return(
        <div id='character-cards-div'>
            {character ? 
                <>
                    <div id='char-card'>
                        {/* <img src={} alt='' /> */}
                        <div id='race-class-div'>
                            <h1>>></h1>
                            <h1>_{character.raceType === 2 ? 'exo' : character.raceType === 1 ? 'awoken' : 'human'}</h1>
                            <h1>_{character.classType === 2 ? 'warlock' : character.classType === 1 ? 'hunter' : 'titan'}</h1>
                            <h1>_{character.light}</h1>
                        </div>
                    </div>
                    <div id='equip-div'>
                        <div id='weapon-div'>
                            <h2>_weapons</h2>
                            <div id='weapon-box'>
                                
                            </div>
                        </div>
                        <div id='armor-div'>
                            <h2>_armor</h2>
                            <div id='armor-box'>

                            </div>
                        </div>
                    </div>
                </>
            : 'loading'}
        </div>
    )
}

export default useDisplayCharacter