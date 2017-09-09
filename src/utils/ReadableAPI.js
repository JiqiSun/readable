
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
  fetch('/categories', { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const createPost = (body) =>
  fetch('/posts', {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const readAllPosts = () =>
  fetch('/posts', {headers})
    .then(res => res.json()) 
    .then(data => data)

export const getPostsByCategories = (category) =>
  fetch(`/${category}/posts`,{headers})
     .then(res => res.json())
     .then(data => data)

export const readPost = (id) =>
  fetch(`/posts/${id}`, {headers})
  	.then(res => res.json()) 
  	.then(data => data)

export const editPost = (id,body) =>
  fetch(`/posts/${id}`,{
     method: 'PUT',
     headers: {
      ...headers,
      'Content-Type': 'application/json'
     },
     body: JSON.stringify(body)		
  }).then(res => res.json())

export const deletePost = (id) =>
   fetch(`/posts/${id}`,{
   	 method: 'DELETE',
   	 headers: {
      ...headers,
      'Content-Type': 'application/json'
     },
   })

export const updateVote = (id,body) =>
  fetch(`/posts/${id}`,{
     method: 'POST',
     headers: {
      ...headers,
      'Content-Type': 'application/json'
     },
     body: JSON.stringify(body)		
  }).then(res => res.json()) 


export const readAllComments = (id) =>
  fetch(`/posts/${id}/comments`, {headers})
    .then(res => res.json()) 
    .then(data => data)

export const createComment = (body) =>
  fetch('/comments', {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())    

export const readComment = (id) =>
  fetch(`/comments/${id}`, {headers})
    .then(res => res.json()) 
    .then(data => data)    

export const editComment = (id,body) =>
  fetch(`/comments/${id}`,{
     method: 'PUT',
     headers: {
      ...headers,
      'Content-Type': 'application/json'
     },
     body: JSON.stringify(body)   
  }).then(res => res.json())

export const updateCommentVote = (id,body) =>
  fetch(`/comments/${id}`,{
     method: 'POST',
     headers: {
      ...headers,
      'Content-Type': 'application/json'
     },
     body: JSON.stringify(body)   
  }).then(res => res.json()) 

export const deleteComment = (id) =>
   fetch(`/comments/${id}`,{
     method: 'DELETE',
     headers: {
      ...headers,
      'Content-Type': 'application/json'
     },
   })           