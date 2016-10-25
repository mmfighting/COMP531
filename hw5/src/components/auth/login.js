import React from 'react'
import {connect} from 'react-redux'
import {localLogin} from './authActions'

const Login = ({dispatch})=> {
    let username, password
    return (
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <h2>Log In</h2>
            <p>
                <b>User Name</b><br/>
                <input type="text" id="login_username" />
            </p>
            <p>
                <b>Password</b><br/>
                <input type="password" id="index_login_password" />
            </p>
            <input type="submit" class="btn-success" id="index_login_btn" value="Log In!" onclick={() => {dispatch(localLogin(username.value, password.value))}} />
            <input type="reset" class="btn-default" value="Clear!" onclick={()=>{dispatch(clearInput)}}/>
        </div>
    )
}
