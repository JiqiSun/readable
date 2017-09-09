import React, { Component } from 'react';
import {updatePostVote} from '../.././actions';
import { connect } from 'react-redux';
import ListPosts from './listPosts';
class ShowAllPosts extends Component{


	handleOnChange = (e) => {
		this.setState({value:e.target.value})
		this.props.handleSort(e.target.value)		
	}


	handleVote = (e,vote,id) =>{
		e.preventDefault()	
		const{dispatch,updatePostsList} = this.props
		let body = {}
		if (vote === 'up') {
			body['option']="upVote"
		} else {
			body['option']="downVote"
		}
		dispatch(updatePostVote(id,body))
		updatePostsList()
	}
	
	render() {
	  const {posts,commentCount} = this.props
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