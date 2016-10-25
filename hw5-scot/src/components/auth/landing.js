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
    <div className="container-fluid">
        <div className="row">
            <div className="text-center">
                <h1>Welcome back!</h1>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-2">&nbsp;</div>
            <div className="col-sm-8">
                <h2>Please log in</h2>
            </div>
            <div className="col-sm-2"></div>
        </div>

        <Login/>

        <div className="row">&nbsp;</div>

        <ErrorMessage/>

        <div className="row">
            <div className="col-sm-2"></div>
            <Register/>
            <div className="col-sm-2"></div>
        </div>

    </div>
)

export default Landing