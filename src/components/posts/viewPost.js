import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchPost,updatePostVote,fetchAllComments} from '../.././actions';
import * as readableApi from '../../utils/ReadableAPI';
import { capitalize } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import ShowAllComments from '../comments/showAllComments'

let postId = null

class ViewPost extends Component{
	componentDidMount() {
		const {location,dispatch} = this.props
		const id = location.pathname.split('/')[2]
    	dispatch(fetchPost(id))
    	postId = id
    	dispatch(fetchAllComments(id,'ORDER_COMMENTS_BY_HIGHTEST_SCORE','des','voteScore'))
	}

	handleDelete = () => {
		const {history,updatePostsList} = this.props
		readableApi.deletePost(postId)
		history.push('/')
		updatePostsList()
	}

	handleVote = (e,vote) =>{
		e.preventDefault()	
		const{dispatch,updatePostsList} = this.props
		let body = {}
		if (vote === 'up') {
			body['option']="upVote"
		} else {
			body['option']="downVote"
		}
		dispatch(updatePostVote(postId,body))
		dispatch(fetchPost(postId))
		updatePostsList()
	}

	handleSort = (value) =>{
	  const {dispatch} = this.props
	  if (value==="LowestVoteScore"){
	      dispatch(fetchAllComments(postId,'ORDER_COMMENTS_BY_LOWEST_SCORE','asc','voteScore'))
	  } else if (value==="LatestDate"){
	      dispatch(fetchAllComments(postId,'ORDER_COMMENTS_BY_LATEST_DATE','des','timestamp'))
	  } else if (value==="OldestDate"){
	      dispatch(fetchAllComments(postId,'ORDER_COMMENTS_BY_OLDEST_DATE','asc','timestamp'))
	  } else {
	      dispatch(fetchAllComments(postId,'ORDER_COMMENTS_BY_HIGHTEST_SCORE','des','voteScore'))
	  }
	}


	render(){
		const {post,comments} = this.props
		return(
			<div className="col-lg-8 mx-auto" style={{'margin':'20px'}}>
				<div >
					<h2>{capitalize(post.title)}</h2>
	  					<small className="text-muted">Posts by {capitalize(post.author)} on {new Date(post.timestamp).toDateString()}, 
	  					Vote Score: {post.voteScore}</small>	
					<p>{post.body}</p>
					<div className="btn-toolbar">
						<div className="btn-group mr-2">
							<button className="btn btn-success" onClick={(e)=>{this.handleVote(e,'up')}}>Like</button>
							<button className="btn btn-warning" onClick={(e)=>{this.handleVote(e,'down')}}>Dislike</button>
						</div>
						<div className="btn-group mr-2 ">
							<Link to={`/posts/${postId}/edit`} className="btn btn-primary">Edit</Link>
							<button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
						</div>
						<div className="btn-group mr-2 ">
							<Link to={`/posts/${postId}/add-comments`} className="btn btn-primary">Add Comment</Link>
						</div>	
					</div>
				</div>
				<ShowAllComments
					comments = {comments}
					handleSort = {this.handleSort}
				/>				
			</div>
		)
	}

}

const mapStateToProps = (state) => ({
  post:state.posts.items,
  comments:state.sortComments.items
})

export default connect(mapStateToProps)(ViewPost)