import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import ProfileForm from './profileForm'
import Avatar from './avatar'

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

const Profile = () => {
    return (
        <div>
            <div className="container">
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <Avatar/>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                    <ErrorMessage/>
                    <ProfileForm/>
                </div>
            </div>
            <footer className="container-fluid text-center">
                <h5>All rights reserved @LuHan</h5>
            </footer>
        </div>
    )
}
export default Profile