import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { register } from './authActions'

class Register extends Component {

    componentDidUpdate() {
        if (this.props.error.length == 0) {
            this.email.value = null
            this.zipcode.value = null
            this.password.value = null
            this.pwconf.value = null
        }
    }

    render() { return (
        <div className="col-sm-8">
            <h2>Register a new account</h2>
            <form onSubmit={(e) => {
                e.preventDefault()
                const payload = {
                    username:this.username.value,
                    email:this.email.value,
                    zipcode:this.zipcode.value,
                    password:this.password.value,
                    pwconf:this.pwconf.value
                }
                this.props.dispatch(register(payload))
            }}>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" for="username">Username</label>
                    <div className="col-sm-9">
                        <input className="form-control" id="username" type="text" ref={(node) => this.username = node } placeholder="desired.username"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" for="email">Email</label>
                    <div className="col-sm-9">
                        <input className="form-control" id="email" type="text" ref={(node) => this.email = node } placeholder="your.email@gmail.com"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" for="zipcode">Zipcode</label>
                    <div className="col-sm-9">
                        <input className="form-control"id="zipcode" type="zipcode" ref={(node) => this.zipcode = node } placeholder="77005"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" for="password">Password</label>
                    <div className="col-sm-9">
                        <input className="form-control"id="password" type="password" ref={(node) => this.password = node } placeholder="password"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" for="pwconf">Confirmation</label>
                    <div className="col-sm-9">
                        <input className="form-control"id="pwconf" type="password" ref={(node) => this.pwconf = node } placeholder="password confirmation"/>
                    </div>
                </div>
                <div className="form-group row">
                    <span className="col-sm-3 form-control-label"></span>
                    <div className="col-sm-9">
                        <button className="btn btn-primary" id="submitButton" type="submit">Register</button>
                    </div>
                </div>
            </form>
        </div>
    )}
}

export default connect()(Register)