import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const apiKey = process.env.REACT_APP_API_KEY

class Register extends Component {

    linkBungie = () => {
        axios.get(`http://localhost:4000/api/linkBng`)
             .then(res => console.log(res))
             .catch(err => console.log(err))
    }

    render(){
        return(
            <div id='login'>
                <div id='login-box'>
                    <h2>Register New User</h2>
                    <h3>Email</h3>
                    <input placeholder='Enter Email' type='text' name='email' />
                    <h3> Password </h3>
                    <input placeholder='Enter Password' type='password' name='password' />
                    <h3> Link Bungie Account </h3>
                    <button onClick={this.linkBungie} > Link </button>
                    <h3>Register</h3>
                    <button>Register</button>
                </div>
            </div>
        )
    }
}

export default Register