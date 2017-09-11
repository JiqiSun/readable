import React, { Component } from 'react';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import {creatNewPost} from '../.././actions';
import { capitalize } from '../../utils/helpers';
import uuid from 'uuid/v1';

class post extends Component{

	
	handleSubmit = (e) =>{
		e.preventDefault()
		const{history,updatePostsList,creatNewPost}=this.props
		const body = serializeForm(e.target, {hash:true})
		body['id'] = uuid()
		body['timestamp'] = Date.now()
		creatNewPost(body)
		history.push('/')
		updatePostsList()
	}
	render(){
		const {categories} = this.props
		return (
			<div style={{"margin":"20px"}} className="row justify-content-md-center">
				<div className="col" style={{"maxWidth":"500px"}}>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group row">
						    <label  className="col-2 col-form-label">Title:</label>
						    <div className="col-10">
						      <input type="text" className="form-control"  name="title"/>
						    </div>
						</div>
						<div className="form-group row">
						    <label  className="col-2 col-form-label">Author:</label>
						    <div className="col-10">
						      <input type="text" className="form-control"  name="author"/>
						    </div>
						</div>
						<fieldset className="form-group">
					      <div className="row">
					        <label className="col-2 col-form-label">Categories:</label>
					        <div className="col-10">
					        	<select className="form-control" name="category">
					        		{ categories.map ((category)=>(
					        			<option key={category.name} value={category.name}>{capitalize(category.name)}</option>
					        		))}
					        	</select>  
					        </div>
					      </div>
					    </fieldset>
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

export default connect(mapStateToProps,{creatNewPost})(post)