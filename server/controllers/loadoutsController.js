module.exports = {
    get: (req, res) => {
        const {user_id} = req.params;
        const db = req.app.get('db');

        let loadouts = db.get_loadouts(user_id)
            .then(loadouts => {
                res.status(200).send(loadouts)
            })
            .catch(err => res.status(500).send(err))
    },

    newLoadout: (req, res) => {
        var{char, kinetic, energy, heavy} = req.body

        loadouts.push({id, char, kinetic, energy, heavy})
        id++
        res.status(200).send(loadouts)
    },

    read: (req, res) => {
        res.status(200).send(loadouts)
    },

    update: (req, res) => {
        var{char, kinetic, energy, heavy} = req.body
        console.log(req.params.id)
        const updateID = req.params.id
        const loadoutIndex = loadouts.findIndex(loadout => loadout.id === +updateID)
        let loadout = loadouts[loadoutIndex]
        
        loadouts[loadoutIndex] = {
            id: id || loadout.id,
            char: char || loadout.char,
            kinetic: kinetic || loadout.kinetic,
            energy: energy || loadout.energy,
            heavy: heavy || loadout.heavy
        }
        res.status(200).send(loadouts)
    },

    delete: (req, res) => {
        const deleteID = req.params.id
        const loadoutIndex = loadouts.findIndex(loadout => loadout.id == deleteID)
        
        loadouts.splice(loadoutIndex, 1)
        res.status(200).send(loadouts)
    }
    
}