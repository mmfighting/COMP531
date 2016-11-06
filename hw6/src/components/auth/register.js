import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Register extends Component {


    render() { return (
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <h2>Register</h2>
            <form  id="registration_form">
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" >Username</label>
                    <div className="col-sm-9">
                        <input className="form-control" id="username" type="text" ref={(node) => this.username = node } placeholder="username"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" >Email</label>
                    <div className="col-sm-8">
                        <input className="form-control" id="email" type="text" ref={(node) => this.email = node } placeholder="your.email@mail.com"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" >Zipcode</label>
                    <div className="col-sm-8">
                        <input className="form-control" id="zipcode" type="zipcode" ref={(node) => this.zipcode = node } placeholder="77005"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" >Password</label>
                    <div className="col-sm-8">
                        <input className="form-control" id="password" type="password" ref={(node) => this.password = node } placeholder="password"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label">Confirmation</label>
                    <div className="col-sm-8">
                        <input className="form-control" id="pwconf" type="password" ref={(node) => this.pwconf = node } placeholder="password confirmation"/>
                    </div>
                </div>
                <div className="form-group row">
                    <span className="col-sm-3 form-control-label"> </span>
                    <div className="col-sm-8">
                        <button className="btn btn-success" id="submitButton" type="submit">Register</button>
                    </div>
                </div>
            </form>
        </div>
    )}
}

export default connect()(Register)