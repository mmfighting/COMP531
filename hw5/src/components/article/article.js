import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { editArticle } from './articleActions'
import Comment from './comment'
class Article extends Component{

	constructor(props){
		super(props);
		this.showComments = false;
	}

 	render(){
		return(
		<div>
			<div className="well">
				<h4>
                    <img className="followingImage" src={ this.props.avatar }/>
                    {this.props.author} posted on {this.props.time}
                </h4>

				{this.props.img===undefined || this.props.img===null? '': <img src={this.props.img} className="img-responsive img-rounded centerImg"/>}
				<p>{this.props.text}</p>
				<div className="text-center">
					<button type="button" className="btn btn-warning"
							disabled={this.disabled}
							onClick={() => {
								this.props.dispatch(editArticle(this.props._id, this.newMessage))
								this.disabled = true
								this.forceUpdate()
							}}>Edit post</button>
					<button type="button" className="btn btn-success" onClick={
						() => { this.addComment = !this.addComment; this.forceUpdate() }}>
						{ this.addComment ? 'Cancel' : 'Add a comment' }
					</button>
					<button type="button" className="btn btn-info" onClick={
						()=>{this.showComments = !this.showComments; this.forceUpdate()}}>
					{!this.showComments?"Show comments":"Hide comments"}</button>
				</div>

				{
					!this.showComments?'': this.props.comments.map((comment)=>
						<Comment key={comment.commentId} author={comment.author} date={comment.date} text={comment.text}/>
					)
				}
				<textarea className="newPostText"
						  cols="80" rows="4" placeholder="your comment"
						  value={this.newComment}
						  onChange={(e) => {
							  this.newComment = e.target.value
							  this.forceUpdate()
						  }}>
                </textarea>
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