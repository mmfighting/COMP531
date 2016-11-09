import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateProfile } from './profileActions'

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
                <label className="col-sm-3 form-control-label" for="email">email</label>
                <div className="col-sm-6">
                    <input className="form-control" id="profile_email" type="text" placeholder={this.props.oldEmail}
                           ref={(node) => this.email = node }/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 form-control-label" for="zipcode">zipcode</label>
                <div className="col-sm-6">
                    <input className="form-control" id="profile_zipcode" type="text" placeholder={this.props.oldZipcode}
                           ref={(node) => this.zipcode = node }/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 form-control-label" for="password">password</label>
                <div className="col-sm-6">
                    <input className="form-control" id="profile_password" type="password" placeholder="password"
                           ref={(node) => this.password = node }/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 form-control-label" for="pwconf">password confirmation</label>
                <div className="col-sm-6">
                    <input className="form-control" id="profile_pwconf" type="password"placeholder="password"
                           ref={(node) => this.pwconf = node }/>
                </div>
            </div>

            <div className="form-group row">
                <span className="col-sm-3 form-control-label"></span>
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
            oldZipcode: state.profile.zipcode,
            oldEmail: state.profile.email,
        }
    }
)(ProfileForm)

export { ProfileForm as PureProfileForm }
