import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Login from './login'
import Register from './register'


const Landing = () => (
    <div>
        <div className="container">
            <div className="jumbotron text-center">
                <h1>Welcome to RiceBook!</h1>
            </div>
            Message
            <Login />
            <Register />
        </div>
    </div>
)

export default Landing