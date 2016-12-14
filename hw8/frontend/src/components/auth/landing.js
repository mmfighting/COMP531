import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Login from './login'
import Register from './register'

let ErrorMessage = ({error, success}) => (
    <div className="row">
        { error.length == 0 ? '' :
            <div className="alert alert-danger">
                <div className="col-sm-1"></div>
                <div className="col-sm-10" id="errorMessage">{ error }</div>
                <div className="col-sm-1"></div>
                <div className="row">&nbsp;</div>
            </div>
        }
        { success.length == 0 ? '' :
            <div className="alert alert-success">
                <div className="col-sm-1"></div>
                <div className="col-sm-10" id="successMessage">{ success }</div>
                <div className="col-sm-1"></div>
                <div className="row">&nbsp;</div>
            </div>
        }
    </div>
)
ErrorMessage.propTypes = {
    error: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired
}
ErrorMessage = connect((state) => {
    return { error: state.common.error, success: state.common.success }
})(ErrorMessage)

const Landing = () => (
    <div>
        <div className="container">
            <div className="jumbotron text-center">
                <h1>Welcome to RiceBook!</h1>
            </div>
            <ErrorMessage />
            <Login />
            <Register />
        </div>
        <footer className="container-fluid text-center">
            <h5>All rights reserved @LuHan</h5>
        </footer>
    </div>
)

export default Landing