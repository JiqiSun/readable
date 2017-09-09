import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import {fetchCategories,fetchAllPosts,fetchAllComments,fetchPostsByCategory,countComment} from './actions';
import { connect } from 'react-redux';
import Nav from './components/nav';
import ShowAllPosts from './components/posts/showAllposts';
import ShowFilteredPosts from './components/posts//showFilteredPosts';
import NewPost from './components/posts//newPost';
import ViewPost from './components/posts//viewPost';
import EditPost from './components/posts//editPost';
import EditComment from './components/comments//editComment';
import NewComment from './components/comments//newComment';

class App extends Component {

  componentDidMount () {
    const {dispatch} = this.props
    dispatch(fetchCategories())
    dispatch(fetchAllPosts('ORDER_POSTS_BY_HIGHTEST_SCORE','des','voteScore'))
    dispatch(countComment())
  }

  filterPosts = (category) =>{
    const {dispatch} = this.props
    if (category==="all"){
      dispatch(fetchAllPosts('ORDER_POSTS_BY_HIGHTEST_SCORE','des','voteScore'))
    } else {
      dispatch(fetchPostsByCategory(category,'ORDER_POSTS_BY_HIGHTEST_SCORE','des','voteScore'))
    }  
  }

  handleSort = (value) =>{
    const {dispatch} = this.props
    if (value==="LowestVoteScore"){
        dispatch(fetchAllPosts('ORDER_POSTS_BY_LOWEST_SCORE','asc','voteScore'))
    } else if (value==="LatestDate"){
        dispatch(fetchAllPosts('ORDER_POSTS_BY_LATEST_DATE','des','timestamp'))
    } else if (value==="OldestDate"){
        dispatch(fetchAllPosts('ORDER_POSTS_BY_OLDEST_DATE','asc','timestamp'))
    } else {
        dispatch(fetchAllPosts('ORDER_POSTS_BY_HIGHTEST_SCORE','des','voteScore'))
    }
  }

  handleFilteredPostsSort = (category,value) =>{
    const {dispatch} = this.props
    if (value==="LowestVoteScore"){
        dispatch(fetchPostsByCategory(category,'ORDER_POSTS_BY_LOWEST_SCORE','asc','voteScore'))
    } else if (value==="LatestDate"){
        dispatch(fetchPostsByCategory(category,'ORDER_POSTS_BY_LATEST_DATE','des','timestamp'))
    } else if (value==="OldestDate"){
        dispatch(fetchPostsByCategory(category,'ORDER_POSTS_BY_OLDEST_DATE','asc','timestamp'))
    } else {
        dispatch(fetchPostsByCategory(category,'ORDER_POSTS_BY_HIGHTEST_SCORE','des','voteScore'))
    }
  }

  updatePostsList =(category) => {
    const {dispatch} = this.props
    if (category) {
      dispatch(fetchPostsByCategory(category,'ORDER_POSTS_BY_HIGHTEST_SCORE','des','voteScore'))
    } else{
      dispatch(fetchAllPosts('ORDER_POSTS_BY_HIGHTEST_SCORE','des','voteScore'))
    }
  }

  updateCommentsList =(id) => {
    const {dispatch} = this.props
    dispatch(fetchAllComments(id,'ORDER_COMMENTS_BY_HIGHTEST_SCORE','des','voteScore'))
    dispatch(countComment())
  }

  render() {
    const {categories,orderedPosts,commentCount} = this.props
    return (
      <div className="container">
        <Nav 
            categories={categories} 
            filterPosts={this.filterPosts}
        />
       
        <Route exact path='/' render={ () => (
          <ShowAllPosts 
            handleSort={this.handleSort}
            posts={orderedPosts}
            commentCount={commentCount}
            updatePostsList={this.updatePostsList}
          />
        )}/>
        <Route exact path='/:category' render={ ({location}) => (
          <ShowFilteredPosts 
            handleFilteredPostsSort={this.handleFilteredPostsSort}
            posts={orderedPosts}
            location={location}
            commentCount={commentCount}
            updatePostsList={this.updatePostsList}    
          />
        )}/>
       <Route  path='/posts/new/post' render={ ({history}) => (
         <NewPost
            categories={categories}
            history={history}
            updatePostsList={this.updatePostsList}
         />
       )}/>
       <Route  exact path='/:category/:post_id' render={ ({location,history}) => (
         <ViewPost
            location={location}
            history={history}
            updatePostsList={this.updatePostsList}
         />
       )}/>
       <Route  exact path='/posts/:id/edit' render={ ({location,history}) => (
         <EditPost
            location={location}
            history={history}
            updatePostsList={this.updatePostsList}
         />
       )}/>
       <Route  exact path='/posts/:id/add-comments' render={ ({location,history}) => (
         <NewComment
            location={location}
            history={history}
            updateCommentsList={this.updateCommentsList}
         />
       )}/>
       <Route  exact path='/comments/:id/edit' render={ ({location,history}) => (
         <EditComment
            location={location}
            history={history}
            updateCommentsList={this.updateCommentsList}
         />
       )}/>            
      </div>
    );
  }
}

const mapStateToProps = ({categories,posts,sortPosts,countComment}) => ({
  categories:categories.items,
  posts:posts.items,
  orderedPosts:sortPosts.items,
  commentCount: countComment.count
})

export default withRouter(connect(mapStateToProps)(App));
