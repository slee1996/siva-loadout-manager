require('dotenv').config()

const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      gradient = require('gradient-string'),
      ac = require('./controllers/authController'),
      lc = require('./controllers/loadoutsController'),
      bc = require('./controllers/bungieController'),
      auth = require('./middleware/authMiddleware'),
      {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env,
      cors = require('cors')
      app = express()

app.use(cors())
app.use(express.json())

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60,
            sameSite: 'none'
        },
        secret: SESSION_SECRET
    })
)

const port = SERVER_PORT

app.listen(port, () => console.log(gradient.instagram(`Server blazing on ${port}`)))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log(gradient.instagram(`DB connected`))
})

//User Endpoints
//userController
app.post('/api/register', ac.register)
app.post('/api/login', ac.login)
app.post('/api/logout', ac.logout)

//Endpoints for hitting Bungie API 
//bungieController
app.get('/api/:membershipID/characters', bc.characters)
app.get('/api/:membershipID/equipment', bc.equipment)
app.get('/api/item/:itemHash', bc.item)
app.get('/api/linkBng', bc.oauth)

//Loadouts Endpoints
//loadoutsController
app.get(`/api/:membership_id/loadouts`, lc.get)
app.delete(`/api/:membership_id/loadouts/:loadout_id`, lc.delete)