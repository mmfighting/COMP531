import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {addFollower, delFollower, dispatch} from './followingActions'

const Follower = ({name, avatar, headline, dispatch}) => (
    <div className="follower">
        <div>&nbsp;</div>
        <div className="media-left">
            <img className="following_Img" src={ avatar }/>
        </div>
        <div className="media-body">
            <div><h5 color="#02307a" className="following_name">{ name }</h5></div>
            <div><em>{ headline }</em></div>
        </div>
        <div className="media-right">
            <span className="glyphicon glyphicon-remove"onClick={() => {
                dispatch(delFollower(name))
            }}></span>
        </div>
    </div>
)

Follower.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    headline: PropTypes.string,
    dispatch: PropTypes.func.isRequired
}

class Following extends Component {
    render() {
        return (
            <div>
                <div className="well">
                    { Object.keys(this.props.followers).sort().map((f) => this.props.followers[f]).map((follower) =>
                        <Follower
                            key={follower.name}
                            name={follower.name} avatar={follower.avatar} headline={follower.headline}
                            dispatch={this.props.dispatch}/>
                    )}
                </div>
                <div className="well">
                    <input className="form-control" type="text"
                           id="new_follower_input"
                           placeholder="add a follower"
                           ref={(node) => this.newFollower = node }
                           onChange={(e) => {
                               this.forceUpdate()
                           }}/>
                    { !(this.newFollower && this.newFollower.value && this.newFollower.value.length > 0) ? '' :
                        <input className="btn btn-primary" type="button"
                               id="add_follower_btn"
                               onClick={() => {
                                   this.props.dispatch(addFollower(this.newFollower.value))
                                   this.newFollower.value = ''
                                   this.forceUpdate()
                               }}
                               value="add follower"/>
                    }
                    { this.props.error.length == 0 ? '' :
                        <div className="alert alert-danger">
                            { this.props.error }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

Following.propTypes = {
    error: PropTypes.string.isRequired,
    followers: PropTypes.object.isRequired
}

export default connect(
    (state) => {
        return {
            error: state.common.error,
            followers: state.followers.followers
        }
    }
)(Following)
