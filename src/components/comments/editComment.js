import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchComment,updateComment} from '../.././actions';
import serializeForm from 'form-serialize';

class EditComment extends Component{

	state = {
		id : null
	}

	componentDidMount() {
		const {location,dispatch} = this.props
		const id = location.pathname.split('/')[2]
    	dispatch(fetchComment(id))
    	this.setState({id})
	}

	handleSubmit = (e) =>{
		e.preventDefault()
		const {history,updateCommentsList,dispatch,comment} = this.props
		const {id} = this.state
		const body = serializeForm(e.target, {hash:true})
		const date = Date.now()
		body['timestamp'] = date
		dispatch(updateComment(id,body))
		history.push(`/posts/${comment.parentId}`)
		updateCommentsList(comment.parentId)
	}

	render(){
		const {comments} = this.props
		console.log(this.props)
		for (let comment of comments) {
			if(comment.id===this.state.id){
				return(
					<div style={{"margin":"20px"}} className="row justify-content-md-center">
						<div className="col" style={{"maxWidth":"500px"}}>
							<form onSubmit={this.handleSubmit}>
							    <div className="form-group row">
								    <label  className="col-2 col-form-label">Body:</label>
								    <div className="col-10">
								     	<textarea className="form-control" name="body"  rows="10" defaultValue={comment.body}></textarea>
								    </div>
								</div>
								<input type="submit" className="btn btn-primary" value="Save"/>
							</form>
						</div>
					</div>	
				)
			}
		}
		return null
	}
}

const mapStateToProps = (state) => ({
  comments: state.sortComments.items,	
  comment:state.comments.items
})

export default connect(mapStateToProps)(EditComment)