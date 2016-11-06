import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {updateHeadline} from '../profile/profileActions'

class Headline extends Component {

    render() {
        return (
            <div>
                <div className="well text-center">
                    <h3 id="username">{this.props.username}</h3>
                    <img className="img-responsive img-rounded centerImg"
                        src={this.props.avatar}/>
                    <h4 id="headline">{this.props.headline}</h4>
                    <input className="form-control" id="headline" type="text"
                           placeholder="update your headline"
                           ref={ (node) => {
                               this.newHeadline = node
                           }}
                           onChange={() => this.forceUpdate()}/>
                    <div>
                        <input className="btn btn-info btn-md"
                               type="button" value="Update your Headline"
                               onClick={() => {
                                   this.props.dispatch(updateHeadline(this.newHeadline.value))
                                   this.newHeadline.value = ''
                               }}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    (state) => {
        return {
            username: state.profile.username,
            headline: state.profile.headline,
            avatar: state.profile.avatar
        }
    }
)(Headline)
