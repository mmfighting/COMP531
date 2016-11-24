import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateProfile } from './profileActions'
var dateFormat = require('dateformat');

class ProfileForm extends Component {

    componentDidUpdate() {
        if (this.props.error.length == 0) {
            this.email.value = null
            this.zipcode.value = null
            this.password.value = null
            this.pwconf.value = null
        }
    }


    render() { return (
        <form onSubmit={(e) => {
            if (e) e.preventDefault()
            const payload = {
                email:this.email.value == this.oldEmail ? '' : this.email.value,
                zipcode:this.zipcode.value == this.oldZipcode ? '' : this.zipcode.value,
                password:this.password.value,
                pwconf:this.pwconf.value
            }
            this.props.dispatch(updateProfile(payload))
        }}>
            <div className="form-group row">
                <label className="col-sm-3 form-control-label" htmlFor="username">Username</label>
                <div className="col-sm-6">
                    <label className="form-control-label">{this.props.oldUsername}</label>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 form-control-label" htmlFor="dob">Date Of Birth</label>
                <div className="col-sm-6">
                    <label className="form-control-label">{this.props.oldDob}</label>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 form-control-label" htmlFor="email">Email</label>
                <div className="col-sm-4">
                    <input className="form-control" id="profile_email" type="text" placeholder={this.props.oldEmail}
                           ref={(node) => this.email = node }/>
                </div>
                <div className="col-sm-4" id="profile_display_email">
                    <label className="form-control-label">{this.props.oldEmail}</label>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 form-control-label" htmlFor="zipcode">Zipcode</label>
                <div className="col-sm-4">
                    <input className="form-control" id="profile_zipcode" type="text" placeholder={this.props.oldZipcode}
                           ref={(node) => this.zipcode = node }/>
                </div>
                <div className="col-sm-4" id="profile_display_zipcode">
                    <label className="form-control-label">{this.props.oldZipcode}</label>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 form-control-label" htmlFor="password">Password</label>
                <div className="col-sm-4">
                    <input className="form-control" id="profile_password" type="password" placeholder="password"
                           ref={(node) => this.password = node }/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 form-control-label" htmlFor="pwconf">Password Confirmation</label>
                <div className="col-sm-4">
                    <input className="form-control" id="profile_pwconf" type="password"placeholder="password"
                           ref={(node) => this.pwconf = node }/>
                </div>
            </div>

            <div className="form-group row">
                <span className="col-sm-3 form-control-label"/>
                <div className="col-sm-9">
                    <button className="btn btn-primary" id="update_profile_btn" type="submit">Update</button>
                </div>
            </div>
        </form>
    )}
}

ProfileForm.propTypes = {
    error: PropTypes.string.isRequired,
    oldZipcode: PropTypes.number.isRequired,
    oldEmail: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect(
    (state) => {
        return {
            error: state.common.error,
            oldUsername: state.profile.username,
            oldDob: state.profile.dob,
            oldZipcode: state.profile.zipcode,
            oldEmail: state.profile.email,
        }
    }
)(ProfileForm)

export { ProfileForm as PureProfileForm }
