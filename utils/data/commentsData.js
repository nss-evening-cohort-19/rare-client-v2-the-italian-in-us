import { clientCredentials } from '../client';

const getAllCommentsByPost = (postId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments?postId=${postId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createComment = (comment) => new Promise((resolve, reject) => {
  fetch('http://localhost:8000/comments', {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const deleteComment = (id) => fetch(`http://localhost:8000/comments/${id}`, {
  method: 'DELETE',
});

const updateComment = (comment) => fetch(`http://localhost:8000/comments/${comment.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify(comment),
})
  .then((response) => response.json())
  .then((data) => {
    console.warn('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

export {
  getAllCommentsByPost, deleteComment, updateComment, createComment,
};
