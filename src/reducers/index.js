import { combineReducers } from 'redux';
import {RECEIVE_CATEGORIES,
		NEW_POST,
		RECEIVE_POST,
		EDIT_POST,
		UPDATE_POST_VOTE,
		NEW_COMMENT,
		EDIT_COMMENT,
		RECEIVE_COMMENT,
		UPDATE_COMMENT_VOTE,
		COUNT_COMMENT,
	   } from '../actions'

const InitalPostItems = {
	id: '',
    timestamp: null,
    title: '',
    body: '',
    author: '',
    category: '',
    voteScore: null,
    deleted: null 
}

const InitalCommentItems = {
	id: '',
    timestamp: null,
    parentId: '',
    body: '',
    author: '',
    parentDeleted: null,
    voteScore: null,
    deleted: null 
}

const categories = (state={items:[]}, action) => {
	switch (action.type) {
		case RECEIVE_CATEGORIES :
			return {
				...state,
				items:action.categories
			}
		default:
			return state	
	}
}

const posts = (state={items:InitalPostItems,
					 },action) => {
	switch (action.type) {
		case NEW_POST:
			return {
				...state,
				items:action.post
			}
		case RECEIVE_POST:
			return{
				...state,
				items:action.post
			}
		case EDIT_POST:
			return{
				...state,
				items:action.post
			}
		case UPDATE_POST_VOTE:
			return{
				...state,
				items:action.post
			}		
		default:
			return state
			
	}
}

const sortPosts = (state={items:[],},action) =>{
	switch (action.type) {
		case "ORDER_POSTS_BY_LOWEST_SCORE":
			return{
				...state,
				items:action.posts,
			}
		case "ORDER_POSTS_BY_HIGHTEST_SCORE":
			return{
				...state,
				items:action.posts,
			}
		case "ORDER_POSTS_BY_LATEST_DATE":
			return{
				...state,
				items:action.posts,
			}
		case "ORDER_POSTS_BY_OLDEST_DATE":
			return{
				...state,
				items:action.posts,
			}	
							
		default:
			return state
	}				
}

const comments = (state={items:InitalCommentItems,
					 },action) => {
	switch (action.type) {
		case NEW_COMMENT:
			return {
				...state,
				items:action.comment
			}
		case RECEIVE_COMMENT:
			return{
				...state,
				items:action.comment
			}
		case EDIT_COMMENT:
			return{
				...state,
				items:action.comment
			}
		case UPDATE_COMMENT_VOTE:
			return{
				...state,
				items:action.comment
			}		
		default:
			return state
			
	}
}

const sortComments = (state={items:[],},action) =>{
	switch (action.type) {
		case "ORDER_COMMENTS_BY_LOWEST_SCORE":
			return{
				...state,
				items:action.comments,
			}
		case "ORDER_COMMENTS_BY_HIGHTEST_SCORE":
			return{
				...state,
				items:action.comments,
			}
		case "ORDER_COMMENTS_BY_LATEST_DATE":
			return{
				...state,
				items:action.comments,
			}
		case "ORDER_COMMENTS_BY_OLDEST_DATE":
			return{
				...state,
				items:action.comments,
			}	
							
		default:
			return state
	}				
}

const countComment = (state={count:{}},action) => {
	switch (action.type) {
		case COUNT_COMMENT:
			return{
				...state,
				count:action.count
			}
		default:
			return state	
	}
}

const rootReducer = combineReducers({
	categories,
	posts,
	sortPosts,
	comments,
	sortComments,
	countComment
})

export default rootReducer