import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getReactions = (userId, postId) => new Promise((resolve, reject) => {
  /// Gets Reactions For Rendering and creation of Post Reactions //
  fetch(`${dbUrl}/reactions?userId=${userId}&postId=${postId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getPostReactions = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/postreactions`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getPostReactionsByPostId = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/postreactions?postId=${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createPostReaction = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/postreactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getPrForDelete = (id, postId, userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/postreactions?id=${id}&postId=${postId}&userId=${userId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deletePostReaction = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/postreactions/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getReactions, getPostReactions, getPostReactionsByPostId, createPostReaction, deletePostReaction, getPrForDelete,
};
