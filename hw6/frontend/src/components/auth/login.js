import React from 'react'
import {connect} from 'react-redux'
import {localLogin} from './authActions'

const Login = ({dispatch})=> {
    let username, password
    return (
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <h2>Log In</h2>
            <p>
                <b>User Name</b><br/>
                <input type="text" id="login_username" ref={(node) => { username = node }}/>
            </p>
            <p>
                <b>Password</b><br/>
                <input type="password" id="login_password" ref={(node) => { password = node }}/>
            </p>
            <input type="submit" className="btn-success" id="index_login_btn" value="Log In!" onClick={() => {dispatch(localLogin(username.value, password.value))}} />
        </div>
    )
}

export default connect()(Login)