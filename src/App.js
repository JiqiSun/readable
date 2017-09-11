import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as actions from './actions';
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
    this.props.fetchCategories()
    this.props.fetchAllPosts('ORDER_POSTS_BY_HIGHTEST_SCORE','des','voteScore')
    this.props.countComment()
  }

  filterPosts = (category) =>{
    if (category==="all"){
      this.props.fetchAllPosts('ORDER_POSTS_BY_HIGHTEST_SCORE','des','voteScore')
    } else {
       this.props.fetchPostsByCategory(category,'ORDER_POSTS_BY_HIGHTEST_SCORE','des','voteScore')
    }  
  }

  handleSort = (value) =>{
    const {fetchAllPosts} = this.props 
    if (value==="LowestVoteScore"){
         fetchAllPosts('ORDER_POSTS_BY_LOWEST_SCORE','asc','voteScore')
    } else if (value==="LatestDate"){
         fetchAllPosts('ORDER_POSTS_BY_LATEST_DATE','des','timestamp')
    } else if (value==="OldestDate"){
         fetchAllPosts('ORDER_POSTS_BY_OLDEST_DATE','asc','timestamp')
    } else {
         fetchAllPosts('ORDER_POSTS_BY_HIGHTEST_SCORE','des','voteScore')
    }
  }

  handleFilteredPostsSort = (category,value) =>{
    const {fetchPostsByCategory} = this.props
    if (value==="LowestVoteScore"){
         fetchPostsByCategory(category,'ORDER_POSTS_BY_LOWEST_SCORE','asc','voteScore')
    } else if (value==="LatestDate"){
         fetchPostsByCategory(category,'ORDER_POSTS_BY_LATEST_DATE','des','timestamp')
    } else if (value==="OldestDate"){
         fetchPostsByCategory(category,'ORDER_POSTS_BY_OLDEST_DATE','asc','timestamp')
    } else {
         fetchPostsByCategory(category,'ORDER_POSTS_BY_HIGHTEST_SCORE','des','voteScore')
    }
  }

  updatePostsList =(category) => {
    if (category) {
       this.props.fetchPostsByCategory(category,'ORDER_POSTS_BY_HIGHTEST_SCORE','des','voteScore')
    } else{
       this.props.fetchAllPosts('ORDER_POSTS_BY_HIGHTEST_SCORE','des','voteScore')
    }
  }

  updateCommentsList =(id) => {
     this.props.fetchAllComments(id,'ORDER_COMMENTS_BY_HIGHTEST_SCORE','des','voteScore')
     this.props.countComment()
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

export default withRouter(connect(mapStateToProps,actions)(App));
