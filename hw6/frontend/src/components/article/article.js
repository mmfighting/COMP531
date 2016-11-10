import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import ContentEditable from './contentEditable'
import {editArticle} from './articleActions'
import Comment from './comment'
class Article extends Component {

    constructor(props) {
        super(props);
        this.showComments = false;
        this.editable = this.props.author === this.props.username;
        this.editactive = false;
        this.addComment = false;
        this.newComment = ''
    }

    render() {
        return (
            <div>
                <div className="well article">
                    <h4 className="article-head">
                        <img className="followingImage" src={ this.props.avatar }/>{this.props.author} posted
                        on {this.props.date}
                    </h4>
                    {this.props.img === undefined || this.props.img === null ? '' :
                        <img src={this.props.img} className="img-responsive img-rounded centerImg"/>}

                    <ContentEditable className="article-text"
                                     html={this.props.text}
                                     contentEditable={this.editable}
                                     tooltip={this.editable ? 'click to edit' : ''}
                                     onChange={(e)=> {
                                         this.newMessage = e.target.value
                                         this.disabled = (this.props.text == this.newMessage)
                                         this.forceUpdate()
                                     }}/>

                    <div className="btn-group">
                        <button className="btn btn-info"
                                onClick={()=> {
                                    this.showComments = !this.showComments;
                                    this.forceUpdate()
                                }}>
                            {!this.showComments ? "Show comments" : "Hide comments"}({ this.props.comments.length })
                        </button>
                        <button className="btn btn-success"
                                onClick={() => {
                                    this.addComment = !this.addComment;
                                    this.forceUpdate()
                                }
                                }>
                            { this.addComment ? 'Cancel' : 'Add a comment' }
                        </button>

                        {!this.editable ? "" :
                            <button className="btn btn-primary"
                                    id="article_edit_btn"
                                    title="Click the text to edit your post"
                                    disabled={this.disabled}
                                    onClick={() => {
                                        this.props.dispatch(editArticle(this.props._id, this.newMessage))
                                        this.disabled = true
                                        this.forceUpdate()
                                    }}>
                                {!this.editactive ? "Edit" : "Post"}
                            </button>
                        }
                    </div>
                    { !this.addComment ? '' :
                        <div className="btn-group">
                            <div>
                                <textarea className="newCommentText"
                                          rows="4" placeholder="your comment"
                                          value={this.newComment}
                                          onChange={(e) => {
                                              this.newComment = e.target.value
                                              this.forceUpdate()
                                          }}>
                                </textarea>
                                <button className="btn btn-success"
                                        disabled={ this.newComment.length == 0 }
                                        onClick={() => {
                                            if (this.newComment.length > 0)
                                                this.props.dispatch(editArticle(this.props._id, this.newComment, -1))
                                            this.newComment = ''
                                            this.addComment = false
                                            this.forceUpdate()
                                        }}>
                                    Post the comment
                                </button>
                            </div>
                        </div>
                    }

                    { !this.showComments ? '' : this.props.comments.sort((a,b) => {
                        if (a.date < b.date)
                            return 1
                        if (a.date > b.date)
                            return -1
                        return 0
                    }).map((comment) =>
                        <Comment key={comment.commentId} articleId={this.props._id} username={this.props.username}
                                 commentId={comment.commentId} author={comment.author} date={comment.date}
                                 text={comment.text} avatar={comment.avatar} />
                    )}
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