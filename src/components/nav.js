import React, { Component } from 'react';
import { capitalize } from '../utils/helpers';
import { Link } from 'react-router-dom';

class Nav extends Component{

	handleClick=(category)=>{
		this.props.filterPosts(category)
	}

	render() {
	  const {categories} = this.props
	  return (
	      <nav className="navbar navbar-expand-lg navbar-light bg-light">
	        <Link onClick = {()=>{this.handleClick("all")}} className="navbar-brand" to="/">Navbar</Link>
	        <div className="collapse navbar-collapse">
	          <ul className="navbar-nav mr-auto">
	            <li className="nav-item">
	              <Link onClick = {()=>{this.handleClick("all")}} to={'/'} className="nav-link">All</Link>
	            </li>  
	            {categories.map((category,index)=>(
	              <li className="nav-item" key={index}>
	                <Link onClick = {()=>{this.handleClick(category.path)}} className="nav-link" to={`/${category.path}`}> {capitalize(category.name)}</Link>
	              </li>
	            ))}
	          </ul>
	          <Link to="/posts/new/post" className="btn btn-primary mr-2">Add Post</Link>
	        </div>
	      </nav>
	  );
	}
}

export default Nav