import React, { Component } from 'react';
import {updatePostVote} from '../.././actions';
import { connect } from 'react-redux';
import ListPosts from './listPosts';

class ShowAllPosts extends Component{

	handleOnChange = (e) => {
		const category = this.props.posts[0]['category']
		this.setState({value:e.target.value})
		this.props.handleFilteredPostsSort(category,e.target.value)			
	}



	handleVote = (e,vote,id) =>{
		e.preventDefault()	
		const{dispatch,updatePostsList} = this.props
		const category = this.props.posts[0]['category']
		let body = {}
		if (vote === 'up') {
			body['option']="upVote"
		} else {
			body['option']="downVote"
		}
		dispatch(updatePostVote(id,body))
		updatePostsList(category)
	}
	
	render() {
	  const {posts,commentCount,} = this.props
	  return (
		  		<ListPosts
		  			posts = {posts}
		  			commentCount = {commentCount}
		  			handleOnChange = {this.handleOnChange}
		  			handleVote = {this.handleVote}
	   			/>	  
	  );
	}
}

export default connect()(ShowAllPosts)