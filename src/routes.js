import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import Register from './Components/Register'
import Stats from './Components/Stats'

export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/register' component={Register} />
        <Route path='/stats' component={Stats} />
    </Switch>
)