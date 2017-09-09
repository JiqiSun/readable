import React, { Component } from 'react';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import {createNewComment} from '../.././actions';
import uuid from 'uuid/v1';

class Comment extends Component{

	handleSubmit = (e) =>{
		e.preventDefault()
		const {history,location,updateCommentsList,dispatch}=this.props
		const id = location.pathname.split('/')[2]
		const body = serializeForm(e.target, {hash:true})
		body['id'] = uuid()
		body['timestamp'] = Date.now()
		body['parentId'] = id
		dispatch(createNewComment(body))
		history.push(`/posts/${id}`)
		updateCommentsList(id)
	}
	render(){
		return (
			<div style={{"margin":"20px"}} className="row justify-content-md-center">
				<div className="col" style={{"maxWidth":"500px"}}>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group row">
						    <label  className="col-2 col-form-label">Author:</label>
						    <div className="col-10">
						      <input type="text" className="form-control"  name="author"/>
						    </div>
						</div>
					    <div className="form-group row">
						    <label  className="col-2 col-form-label">Body:</label>
						    <div className="col-10">
						     	<textarea className="form-control" name="body" rows="10"></textarea>
						    </div>
						</div>
						<input type="submit" className="btn btn-primary" value="Save"/>
					</form>
				</div>
			</div>	
			
		)
	}

}

const mapStateToProps = (state) => ({
  posts:state.posts,
})

export default connect(mapStateToProps)(Comment)