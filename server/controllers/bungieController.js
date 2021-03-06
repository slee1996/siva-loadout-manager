const axios = require('axios')
const apiKey = process.env.REACT_APP_API_KEY

module.exports = {
    oauth: async(req, res) => {
        const response = await axios.get(`https://www.bungie.net/en/OAuth/Authorize?client_id=31812&response_type=code`, {headers: { 'X-API-Key': apiKey, 'crossdomain': 'true' }})
                                    .catch(err => console.log(err))

        res.status(201).send(response)
    },

    characters: async(req, res) => {
        const {membershipID} = req.params;

        const response = await axios.get(`https://www.bungie.net/Platform/Destiny2/1/Profile/${membershipID}/?components=Characters,CharacterEquipment,CharacterInventories`, {
                    headers: {'X-API-Key': apiKey}
                })
                //console.log('characters')
                console.log(response.data.Response)
       
        res.response =  {
            characters: [Object.values(response.data.Response.characters.data)],
            equipment: [Object.values(response.data.Response.characterEquipment.data)],
            inventory: Object.values(response.data.Response.characterInventories)
        }
        res.status(201).send(res.response)
    },

    equipment: async(req, res) => {
        const {membershipID} = req.params;

        const response = await axios.get(`https://www.bungie.net/Platform/Destiny2/1/Profile/${membershipID}/?components=CharacterEquipment`, {
                    headers: {'X-API-Key': apiKey}
                })
                //console.log('equipment')
                //console.log(response.data.Response.characterEquipment)

        res.response = Object.values(response.data.Response.characterEquipment.data)
        //res.response.map = res.response.map(e => e.items)
        //console.log(res.response)
        //console.log(map.map(items => items.itemHash))
        res.status(201).send(res.response)
    },

    item: async(req, res) => {
        const {itemHash} = req.params;
        const response = await axios.get(`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemHash}/`, {headers: {'X-API-Key': apiKey}})
                                    .then(res => (
                                        res.data.Response
                                    ))
                                    .catch(err => console.log(err))
        //console.log(response)
        res.response = response
        res.status(201).send(res.response)
    }
}