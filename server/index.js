require('dotenv').config()

const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      gradient = require('gradient-string'),
      uc = require('./userController'),
      {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env,
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

app.listen(port, () => console.log(gradient.instagram(`Server blazing on ${port}`)))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log(gradient.instagram('DB connected'))
})

//Endpoints
app.post('/api/register', uc.register)
app.post('/api/login', uc.login)