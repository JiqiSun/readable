import * as readableApi from '../utils/ReadableAPI'
import {asc, des} from '../utils/helpers'

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"
export const NEW_POST = "NEW_POST"
export const RECEIVE_POST = "RECEIVE_POST"
export const EDIT_POST = "EDIT_POST"
export const UPDATE_POST_VOTE = "UPDATE_POST_VOTE"
export const NEW_COMMENT = "NEW_COMMENT"
export const RECEIVE_COMMENT = "RECEIVE_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const UPDATE_COMMENT_VOTE = "UPDATE_COMMENT_VOTE"
export const COUNT_COMMENT = "COUNT_COMMENT"


const actionGenerator = (type,key,data) => {
	let object = {}
	object['type'] = type
	object[key] = data
	return object
}


export const fetchCategories = () => dispatch => (
	readableApi.getCategories()
	.then(data => dispatch(actionGenerator(RECEIVE_CATEGORIES,'categories',data)))
)


export const fetchAllPosts = (type,order,flag) => dispatch => {
	switch(order){
		case "des":
			return readableApi.readAllPosts()
				   .then(data => dispatch(actionGenerator(type,'posts',des(data,flag))))
		case "asc":
			return readableApi.readAllPosts()
				   .then(data => dispatch(actionGenerator(type,'posts',asc(data,flag))))
		default:
			return null		   		   			
	}
	
} 


export const fetchPostsByCategory = (category,type,order,flag) => dispatch => {
	switch(order){
		case "des":
			return readableApi.getPostsByCategories(category)
				   .then(data => dispatch(actionGenerator(type,'posts',des(data,flag))))
		case "asc":
			return readableApi.getPostsByCategories(category)
				   .then(data => dispatch(actionGenerator(type,'posts',asc(data,flag))))
		default:
			return null		   		   			
	}
	
}


export const creatNewPost = (body) => dispatch =>(
	readableApi.createPost(body)
	.then(data => dispatch (actionGenerator(NEW_POST,'post',data)))
)


export const fetchPost = (id) => dispatch => (
	readableApi.readPost(id)
	.then(data => dispatch(actionGenerator(RECEIVE_POST,'post',data)))
)


export const updatePost = (id,body) => dispatch => (
	readableApi.editPost(id,body)
	.then(data => dispatch(actionGenerator(EDIT_POST,'post',data)))
)

export const updatePostVote = (id,body) => dispatch => (
	readableApi.updateVote(id,body)
	.then(data => dispatch(actionGenerator(UPDATE_POST_VOTE,'post',data)))
)

export const fetchAllComments = (id,type,order,flag) => dispatch => {
	switch(order){
		case "des":
			return readableApi.readAllComments(id)
				   .then(data => dispatch(actionGenerator(type,'comments',des(data,flag))))
		case "asc":
			return readableApi.readAllComments(id)
				   .then(data => dispatch(actionGenerator(type,'comments',asc(data,flag))))
		default:
			return null		   		   			
	}	
}

export const createNewComment = (body) => dispatch =>(
	readableApi.createComment(body)
	.then(data => dispatch (actionGenerator(NEW_COMMENT,'post',data)))
)

export const fetchComment = (id) => dispatch => (
	readableApi.readComment(id)
	.then(data => dispatch(actionGenerator(RECEIVE_COMMENT,'comment',data)))
)

export const updateComment = (id,body) => dispatch => (
	readableApi.editComment(id,body)
	.then(data => dispatch(actionGenerator(EDIT_COMMENT,'comment',data)))
)

export const updateCommentVote = (id,body) => dispatch => (
	readableApi.updateCommentVote(id,body)
	.then(data => dispatch(actionGenerator(UPDATE_COMMENT_VOTE,'post',data)))
)

export const countComment = () => dispatch =>{
	let count = {}
	readableApi.readAllPosts()
	.then((posts) => {		
	  for (let post of posts){
	    readableApi.readAllComments(post.id).then((data) => {
	    	count[post.id] = data.length
	    	return count	
	    }).then( (data) => { 
	    	if (Object.keys(data).length === posts.length){
	    		dispatch(actionGenerator(COUNT_COMMENT,'count',data))
	    	} 
	    })
	  }
	})    
}

