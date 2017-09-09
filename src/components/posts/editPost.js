import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updatePost} from '../.././actions';
import serializeForm from 'form-serialize';

class EditPost extends Component{

	handleSubmit = (e) =>{
		e.preventDefault()
		const body = serializeForm(e.target, {hash:true})
		const {location,history,updatePostsList,dispatch} = this.props
		const id = location.pathname.split('/')[2]
		dispatch(updatePost(id,body))
		history.push(`/posts/${id}`)
		updatePostsList()
	}

	render(){
		const {post} = this.props
		return(
			<div style={{"margin":"20px"}} className="row justify-content-md-center">
				<div className="col" style={{"maxWidth":"500px"}}>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group row">
						    <label  className="col-2 col-form-label">Title:</label>
						    <div className="col-10">
						      <input type="text" className="form-control"  name="title" defaultValue={post.title}/>
						    </div>
						</div>
					    <div className="form-group row">
						    <label  className="col-2 col-form-label">Body:</label>
						    <div className="col-10">
						     	<textarea className="form-control" name="body" rows="10" defaultValue={post.body}></textarea>
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
  post:state.posts.items
})

export default connect(mapStateToProps)(EditPost)