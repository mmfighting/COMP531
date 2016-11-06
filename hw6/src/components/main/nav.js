import React from 'react'
import { connect } from 'react-redux'
import { navToMain, navToProfile } from '../../actions'
import { logout } from '../auth/authActions'


const Nav = ({username, onProfile, dispatch}) => (
    <nav className="navbar navbar-inverse">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavbar" aria-expanded="false">
                    <span className="icon-bar"/>
                    <span className="icon-bar"/>
                    <span className="icon-bar"/>
                </button>
                <img className="navbar-brand" name="ricelogo" src="https://s-media-cache-ak0.pinimg.com/originals/ab/66/80/ab66803f1bf1a9bf2bddca5209202fa1.jpg"/>
                <a className="navbar-brand" href="#">RiceBook</a>
            </div>
            <div className="nav navbar-nav navbar-right">
                <ul className="nav navbar-nav">
                    { username.length == 0 ? '' :
                        <div className="nav navbar-nav navbar-right">
                            <ul className="nav navbar-nav">
                                { onProfile ?
                                    <li><a href="#" onClick={() => { dispatch(navToMain()) }}><span className="glyphicon glyphicon-home"/>Home</a></li> :
                                    <li><a href="#" onClick={() => { dispatch(navToProfile()) }}><span className="glyphicon glyphicon-user"/>Edit Profile</a></li>
                                }
                                <li><a href="#" onClick={() => { dispatch(logout()) }}><span className="glyphicon glyphicon-log-out"/>Log out {username} </a></li>
                                <li>&nbsp;</li>>
                            </ul>
                        </div>
                    }
                </ul>
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