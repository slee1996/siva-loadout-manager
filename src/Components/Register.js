import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const clientID = 9494
const headers = {'Access-Control-Allow-Origin': 'https://localhost:3000', 'X-API-Key': 'c81ffdf4ee3a4e27834df8abe16d6925' }

class Register extends Component {

    linkBungie = () => {
        axios.post(`https://www.bungie.net/en/OAuth/Authorize?client_id=${clientID}&response_type=code`, {headers: { 'Access-Control-Allow-Origin': 'https://localhost:3000', 'X-API-Key': 'c81ffdf4ee3a4e27834df8abe16d6925', 'crossdomain': 'true' }})
             .then(res => console.log(res.data))
    }

    render(){
        return(
            <div id='login'>
                <div id='login-box'>
                    <h2>Register New User</h2>
                    <h3>Email</h3>
                    <input placeholder='Enter Email' type='text' name='email' />
                    <h3>Password</h3>
                    <input placeholder='Enter Password' type='password' name='password' />
                    <h3>Link Bungie Account</h3>
                    <button onClick={this.linkBungie}>Link</button>
                    <h3>Register</h3>
                    <button>Register</button>
                </div>
            </div>
        )
    }
}

export default Register