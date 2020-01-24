import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {logout} from '../redux/userReducer'

const Nav = (props) => {
    const logout = () => {
        axios.post('http://localhost:4000/api/logout')
             .then(res => {
                 props.logout()
             })
             .catch(err => console.log(err))
    }

    return(
        <div id='nav'>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/stats'>Stats</Link>
            <Link onClick={logout} to='/'>Logout</Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    const {user} = state
    console.log(state.username)
    return {user};
}

export default connect(mapStateToProps, {logout})(Nav)