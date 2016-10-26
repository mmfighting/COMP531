import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Comment from './comment'
 
class Article extends Component{

	constructor(props){
		super(props);
		this.showComments = false;
	}

 	render(){
		return(
		<div className="row panel panel-default">
			<div className="panel-body">
				<h3>{this.props.author} posted on {this.props.time}</h3> 
				{this.props.img===undefined || this.props.img===null? '': <img src={this.props.img} className="card-image"/>}
				<p>{this.props.text}</p>
				<div className="text-center">
					<button type="button" className="btn btn-primary">Edit post</button>
					<button type="button" className="btn btn-primary">Add a comment</button>
					<button type="button" className="btn btn-primary" onClick={
						()=>{this.showComments = !this.showComments; this.forceUpdate()}
					}>{!this.showComments?"Show commnets":"Hide comments"}</button>
				</div>
				{
					!this.showComments?'': this.props.comments.map((comment)=>
						<Comment key={comment.commentId} author={comment.author} date={comment.date} text={comment.text}/>
					)
				}
			</div>
		</div>)
	}
}

Article.PropTypes = {
	_id: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
	comments: PropTypes.arrayOf(PropTypes.shape({...Comment.PropTypes}).isRequired).isRequired
}

export default connect()(Article)