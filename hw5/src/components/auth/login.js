import React from 'react'
import {connect} from 'react-redux'
import Action, { resource, updateError, updateSuccess, navToMain, navToOut, apiUrl } from '../../actions'

const Login = ({dispatch})=> {
    let username, password
    return (
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <h2>Log In</h2>
            <p>
                <b>User Name</b><br/>
                <input type="text" id="login_username" />
            </p>
            <p>
                <b>Password</b><br/>
                <input type="password" id="index_login_password" />
            </p>
            <input type="submit" className="btn-success" id="index_login_btn" value="Log In!" onClick={() => {dispatch(navToMain())}} />
        </div>
    )
}

export default connect()(Login)