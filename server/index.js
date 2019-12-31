require('dotenv').config()

const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      gradient = require('gradient-string'),
      uc = require('./userController'),
      lc = require('./loadoutsController'),
      {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET, X_API_KEY} = process.env,
      cors = require('cors')
      app = express()
      path = require('path')

app.use(cors())
app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60},
    secret: SESSION_SECRET
}))

const port = SERVER_PORT
const apiKey = X_API_KEY

app.listen(port, () => console.log(gradient.instagram(`Server blazing on ${port}`)))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log(gradient.instagram(`DB connected`))
})

//User Endpoints
app.post('/api/register', uc.register)
app.post('/api/login', uc.login)

//Loadouts Endpoints
app.get(`/api/:user_id/loadouts`, lc.getLoadouts)