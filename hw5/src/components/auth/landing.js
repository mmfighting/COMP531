import React, {PropTypes} from 'react'
import Login from './login'
import Register from './register'

const Index=()=>(
    <div>
        <div class="container">
            <div class="jumbotron" align="center">
                <h1>Welcome to RiceBook!</h1>
            </div>
        </div>

        <Login />
        <Register />
    </div>
)

export default Index