import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {register} from './authActions'
class Register extends Component {

    componentDidUpdate() {
        if (this.props.error.length == 0) {
            this.email.value = null
            this.zipcode.value = null
            this.password.value = null
            this.pwconf.value = null
        }
    }

    render() {
        return (
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <h2>Register</h2>
                <form id="registration_form" onSubmit={(e) => {
                    e.preventDefault()
                    this.props.dispatch(register(this.username.value, this.email.value, this.dob.value, this.zipcode.value, this.password.value, this.pwconf.value))
                }}>
                    <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Username</label>
                        <div className="col-sm-9">
                            <input className="form-control" id="username" type="text"
                                   ref={(node) => this.username = node } placeholder="username"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Email</label>
                        <div className="col-sm-8">
                            <input className="form-control" id="email" type="text" ref={(node) => this.email = node }
                                   placeholder="your.email@mail.com"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Date of Birth</label>
                        <div className="col-sm-8">
                            <input className="form-control" id="dob" type="date" min="1890-01-01" max="1998-12-30"
                                   ref={(node) => this.dob = node } placeholder="mm/dd/yyyy"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Zipcode</label>
                        <div className="col-sm-8">
                            <input className="form-control" id="zipcode" type="zipcode"
                                   ref={(node) => this.zipcode = node } placeholder="Five-digit zipcode, e.g. 77005"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Password</label>
                        <div className="col-sm-8">
                            <input className="form-control" id="password" type="password"
                                   ref={(node) => this.password = node } placeholder="password"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Confirmation</label>
                        <div className="col-sm-8">
                            <input className="form-control" id="pwconf" type="password"
                                   ref={(node) => this.pwconf = node } placeholder="password confirmation"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <span className="col-sm-3 form-control-label"> </span>
                        <div className="col-sm-8">
                            <input className="btn btn-success" id="register_btn" type="submit" value="Register"/>
                            <input className="btn btn-primary" value="Clear" onClick={()=>{
                                this.username.value='';
                                this.email.value='';
                                this.dob.value='';
                                this.zipcode.value='';
                                this.password.value='';
                                this.pwconf.value='';
                            }}/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect()(Register)