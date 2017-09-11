import React, { Component } from 'react';
import { connect } from 'react-redux';
import { capitalize } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import {updateCommentVote,countComment,fetchAllComments} from '../.././actions';
import * as readableApi from '../../utils/ReadableAPI';


class ShowAllComments extends Component{

	handleVote = (e,vote,id,parentId) =>{
		e.preventDefault()	
		const{dispatch} = this.props
		let body = {}
		if (vote === 'up') {
			body['option']="upVote"
		} else {
			body['option']="downVote"
		}
		dispatch(updateCommentVote(id,body))
		dispatch(fetchAllComments(parentId,'ORDER_COMMENTS_BY_HIGHTEST_SCORE','des','voteScore'))
	}

	handleOnChange = (e) => {
		this.setState({value:e.target.value})
		this.props.handleSort(e.target.value)
	}

	handleDelete = (id,parentId) =>{
		const {dispatch} = this.props
		readableApi.deleteComment(id)
	  	dispatch(fetchAllComments(parentId,'ORDER_COMMENTS_BY_HIGHTEST_SCORE','des','voteScore'))
	  	dispatch(countComment())
	}


	render() {
	  const {comments} = this.props
	  return (
	  	<div className="row">
	  		<div className="col-8">
	  			{ comments.map((comment) => (
	  				<div key={comment.id} style={{'margin':'20px'}}>
	  					{ !comment.deleted ?
		  					(  <div>
			  						<p>{comment.body}</p>
			  						<small className="text-muted">Commented by {capitalize(comment.author)} on {new Date(comment.timestamp).toDateString()}, Vote Score: {comment.voteScore}</small>
			  						<div className="btn-toolbar">
				  						<div className="btn-group btn-group-sm mr-2">
				  							<button className="btn btn-success" onClick={(e)=>{this.handleVote(e,'up',comment.id,comment.parentId)}}>Like</button>
				  							<button className="btn btn-warning" onClick={(e)=>{this.handleVote(e,'down',comment.id,comment.parentId)}}>Dislike</button>
				  						</div>
				  						<div className="btn-group btn-group-sm mr-2">
				  							<Link  to={`/comments/${comment.id}/edit`} className="btn btn-primary">Edit</Link>
											<button className="btn btn-danger" onClick={()=>{this.handleDelete(comment.id, comment.parentId)}}>Delete</button>
				  						</div>
			  						</div>
		  					   </div>
		  					):null
	  					}
	  				</div>
	  			))}
	  		</div>
	  		{ comments.length!==0 ?
		  		(<div className=" col-4">
		  		 <form className="form-inline" style={{'margin':'20px'}}>	 
		          	 <select className="form-control" onChange={this.handleOnChange}>
		          	 	<option value="HightestVoteScore">Hightest Vote Score</option>
		          	 	<option value="LowestVoteScore">Lowest Vote Score</option>
		          	 	<option value="LatestDate">Latest Date</option>
		          	 	<option value="OldestDate">Oldest Date</option>
		          	 </select>	
		          </form>
		        </div>): null 
		  	}		
	  	</div> 		  
	  );
	}
}


export default connect()(ShowAllComments)