import React, { Component } from 'react';
import { capitalize } from '../../utils/helpers';
import { Link } from 'react-router-dom';
class ShowPosts extends Component{
	
	render() {
	  const {posts,commentCount,handleVote,handleOnChange} = this.props
	  return (
	  	<div className="row">
	  		<div className="col-8">
	  			{ posts.map((post) => (
	  				<div key={post.id} style={{'margin':'20px'}}>
	  					{ !post.deleted ?
			  				(	
			  					<div>
			  						<Link to={`${post.category}/${post.id}`}>
				  						<h2>{capitalize(post.title)}</h2>
				  						<small className="text-muted">Posts by {capitalize(post.author)} on {new Date(post.timestamp).toDateString()}, Comments: {commentCount[post.id]} , Vote Score: {post.voteScore}</small>
				  					</Link>
				  					<div className="btn-toolbar">
				  						<div className="btn-group btn-group-sm mr-2">
				  							<button className="btn btn-success" onClick={(e)=>{handleVote(e,'up',post.id)}}>Like</button>
				  							<button className="btn btn-warning" onClick={(e)=>{handleVote(e,'down',post.id)}}>Dislike</button>
				  						</div>
			  						</div>
		  						</div>
		  					):null
	  					}
	  				</div>
	  			))}
	  		</div>
	  	
	  		<div className=" col-4">
	  		 <form className="form-inline" style={{'margin':'20px'}}>	 
	          	 <select className="form-control" onChange={handleOnChange}>
	          	 	<option value="HightestVoteScore">Hightest Vote Score</option>
	          	 	<option value="LowestVoteScore">Lowest Vote Score</option>
	          	 	<option value="LatestDate">Latest Date</option>
	          	 	<option value="OldestDate">Oldest Date</option>
	          	 </select>	
	          </form>
	        </div>
   
	  	</div> 		  
	  );
	}
}

export default ShowPosts