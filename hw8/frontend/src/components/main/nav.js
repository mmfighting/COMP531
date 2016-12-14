import React from 'react'
import { connect } from 'react-redux'
import { navToMain, navToProfile } from '../../actions'
import { logout } from '../auth/authActions'


const Nav = ({username, onProfile, dispatch}) => (
    <nav className="navbar navbar-inverse">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar" aria-expanded="false">
                    <span className="icon-bar"/>
                    <span className="icon-bar"/>
                    <span className="icon-bar"/>
                </button>
                <img className="navbar-brand" name="ricelogo" src="https://s-media-cache-ak0.pinimg.com/originals/ab/66/80/ab66803f1bf1a9bf2bddca5209202fa1.jpg"/>
                <a className="navbar-brand" href="#">RiceBook</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
                { username.length == 0 ? '' :
                    <ul className="nav navbar-nav navbar-right">
                        { onProfile ?
                            <li><a href="#" id='nav_main' onClick={() => { dispatch(navToMain()) }}><span className="glyphicon glyphicon-home"/>Home</a></li> :
                            <li><a href="#" id='nav_profile' onClick={() => { dispatch(navToProfile()) }}><span className="glyphicon glyphicon-user"/>Edit Profile</a></li>
                        }
                        <li><a href="#" id='nav_logout' onClick={() => { dispatch(logout()) }}><span className="glyphicon glyphicon-log-out"/>Log out {username} </a></li>
                        <li>&nbsp;</li>>
                    </ul>
                }
            </div>
        </div>
    </nav>
)

export default connect(
    (state) => {
        return {
            username: state.profile.username || '',
            onProfile: state.common.location == 'profile' }
    })(Nav)