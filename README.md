# Readable Porject
This simple readable app allows you to to post content to predefined categories, comment on posts and other users' posts, and vote on posts and comments. 
Users will also be able to edit and delete posts and comments.

# Install and Run App
npm install
npm start

# Backend Server

[`ReadableAPI.js`](src/utils/ReadableAPI.js) contains the methods you will need to perform necessary operations on the backend.
Instrctions of installing backend server can be found at [this repository](https://github.com/udacity/reactnd-project-readable-starter). 

### `getCategories()`
* Usage: Get all of the categories available for the app.
* Returns a Promise which resolves to a JSON object containing all of the categories available for the app.

### `createPost(body)`
* Usage:  Add a new post
* body: `Object` containing:
-id: `<String>` 
-timestamp: `<Integer>`
-title: `<String>` 
-body: `<String>` 
-author: `<String>` 
-category: `<String>`

* Returns a Promise which resolves to a JSON object containing the response data of the POST request.

### `readAllPosts()`
* Usage: Get all of the posts. Useful for the main page when no category is selected.
* Returns a Promise which resolves to a JSON object containing all of the posts available for the app.

### `getPostsByCategories(category)`
* category: `<String>`
* Returns a Promise which resolves to a JSON object containing all of the posts filtered by category.

### `readPost(id)`
* Usage: Get the details of a single post
* id: `<String>`
* Returns a Promise which resolves to a JSON object containing detail of a single post.

### `editPost(id,body)`
* Usage: Edit the details of an existing post
* id: `<String>`
* body: `Object` containing:
-title: `<String>` 
-body: `<String>` 
* Returns a Promise which resolves to a JSON object containing the response data of the POST request.

### `deletePost(id)`
* Usage: 
-Sets the deleted flag for a post to 'true'. 
-Sets the parentDeleted flag for all child comments to 'true'.
* id: `<String>`

### `updateVote(id,body)`
* Usage: Used for voting on a post
* id: `<String>`
* body: `Object` containing:
-option: `<String>` 
-option either "upVote" or "downVote"
* Returns a Promise which resolves to a JSON object containing the response data of the POST request.

### `readAllComments(id)`
* Usage: Get all the comments for a single post
* id: `<String>`
* Returns a Promise which resolves to a JSON object containing all of the comments related to the post.

### `createComment(body)`
* Usage: Add a comment to a post
* body: `Object` containing:
-id: `<String>` 
-timestamp: `<Integer>`
-body: `<String>` 
-author: `<String>` 
-parentId: `<String>`
* Returns a Promise which resolves to a JSON object containing the response data of the POST request.

### `readComment(id)`
* Usage: Get the details for a single comment
* -id: `<String>`
* Returns a Promise which resolves to a JSON object containing all of the detail of a single comment. 


### `editComment(id,body)`
* Usage: Edit the details of an existing comment
* -id: `<String>`
* body: `Object` containing:
-timestamp: `<Integer>`
-body: `<String>`
* Returns a Promise which resolves to a JSON object containing the response data of the POST request. 


### `updateCommentVote(id,body)`
* Usage: Used for voting on a comment.
* id: `<String>`
* body: `Object` containing:
-option: `<String>` 
-option either "upVote" or "downVote"
* Returns a Promise which resolves to a JSON object containing the response data of the POST request.

### `deleteComment(id)`
* Usage: Sets a comment's deleted flag to 'true'
* id: `<String>` 

### Feel free to change your proxy to your local api server in package.json

