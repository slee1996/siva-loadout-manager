module.exports = {
    getLoadouts: (req, res) => {
        const {user_id} = req.params;
        const db = req.app.get('db');

        let loadouts = db.get_loadouts(user_id)
            .then(loadouts => {
                res.status(200).send(loadouts)
            })
            .catch(err => res.status(500).send(err))
    }
}