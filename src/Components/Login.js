import React, {Component} from 'react'
import axios from 'axios'
import {getUser} from '../redux/userReducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    registerUser = () => {
        const {email, password} = this.state
        
        axios.post('http://localhost:4000/api/register', {email, password})
            .then(res => {
                this.props.history.push('/dashboard')
                this.props.getUser(res.data)
            })
            .catch(err => console.log(err))
    }

    handleLogin = () => {
        axios.post('http://localhost:4000/api/login', {email: this.state.email, password: this.state.password})
            .then(res => {
                this.props.history.push('/dashboard')
                this.props.getUser(res.data)
        })
        .catch(err => console.log(err))
    }

    render(){
        console.log(this.state.password)
        return(
            <div id='login'>
                <div id='login-box'>
                    <h2>SIVA</h2>
                    <h3>Email</h3>
                    <input placeholder='Enter Email' type='text' onChange={(event) => this.handleInput(event)} name='email' />
                    <h3>Password</h3>
                    <input placeholder='Enter Password' type='password' onChange={(event) => this.handleInput(event)} name='password' />
                    <button onClick={this.handleLogin} >Login</button>
                    <button onClick={this.registerUser}>Register</button>
                </div>
            </div>
        )
    }
}

export default connect(null, {getUser})(Login)