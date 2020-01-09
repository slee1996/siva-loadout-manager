import React, { useState, useEffect } from 'react'

const useTest = (keys) => {
    let [newKeys, setNewKeys] = useState([])
    let [one, setOne] = useState(null)
    let [two, setTwo] = useState(null)
    let [three, setThree] = useState(null)
    
    useEffect(() => {
        setNewKeys(keys)
    })

    

    return(
        <>
        {one}
        {two}
        {three}
        </>
    )
}

export default useTest